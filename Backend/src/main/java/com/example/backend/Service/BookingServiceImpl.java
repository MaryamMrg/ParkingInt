package com.example.backend.Service;

import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;
import com.example.backend.Model.Parking;
import com.example.backend.Model.ParkingPlace;
import com.example.backend.Model.Status;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.ParkingPlaceRepository;
import com.example.backend.repository.ParkingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService{

    private final BookingMapper bookingMapper;
    private final BookingRepository bookingRepository;
    private final ParkingPlaceRepository parkingPlaceRepository;
    private  final ParkingRepository parkingRepository;

    public BookingServiceImpl(BookingMapper bookingMapper, BookingRepository bookingRepository, ParkingPlaceRepository parkingPlaceRepository, ParkingRepository parkingRepository) {
        this.bookingMapper = bookingMapper;
        this.bookingRepository = bookingRepository;
        this.parkingPlaceRepository = parkingPlaceRepository;
        this.parkingRepository = parkingRepository;
    }
    @Transactional
    public BookingDto addBooking(BookingDto bookingDto) {

        //get the parkingplace by id
        ParkingPlace parkingPlace = parkingPlaceRepository.findById(bookingDto.getPlaceId())
                .orElseThrow(() -> new IllegalStateException("Parking place not found"));

        //get the parking by id
        Parking parking = parkingRepository.findById(bookingDto.getParkingId())
                .orElseThrow(() -> new IllegalStateException("Parking place not found"));

        //check aviability
        if (parkingPlace.getStatus() != Status.AVAILABLE) {
            throw new IllegalStateException("Parking place is not available for booking");
        }

        Booking booking = bookingMapper.toEntity(bookingDto);

        booking.setParkingPlace(parkingPlace);
        booking.setParking(parking);
        // Update parking place status
        parkingPlace.setStatus(Status.RESERVED);
        parkingPlace.setAvailablty(false);
        parkingPlaceRepository.save(parkingPlace);

        // Save booking
        Booking saved = bookingRepository.save(booking);

        return bookingMapper.toDto(saved);
    }
    public List<BookingDto> getAll(){
        List<Booking> bookings = bookingRepository.findAll();
        return bookingMapper.toDtos(bookings);
    }

    public List<Booking> findBookingByUserId(Long userId){
        return bookingRepository.findByUserId(userId);
    }
    public BookingDto updateBooking(BookingDto dto,Long id){
        Booking booking =bookingRepository.findById(id).orElseThrow(()->new RuntimeException("not found"));
        booking.setEndTime(dto.getEndTime());
        booking.setStartTime(dto.getStartTime());
        Booking saved =bookingRepository.save(booking);
        return bookingMapper.toDto(saved);
    }

    public void deleteBooking(Long id){
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Booking not found with id: " + id));

        ParkingPlace parkingPlace = booking.getParkingPlace();

        if (parkingPlace != null) {
            // Update parking place status back to available
            parkingPlace.setStatus(Status.AVAILABLE);
            parkingPlace.setAvailablty(true);

            // Save the updated parking place
            parkingPlaceRepository.save(parkingPlace);
        }

        bookingRepository.deleteById(id);
    }


}
