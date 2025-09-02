package com.example.backend.Service;

import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;
import com.example.backend.Model.ParkingPlace;
import com.example.backend.Model.Status;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.ParkingPlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final BookingMapper bookingMapper;
    private final BookingRepository bookingRepository;
    private final ParkingPlaceRepository parkingPlaceRepository;

    public BookingService(BookingMapper bookingMapper, BookingRepository bookingRepository, ParkingPlaceRepository parkingPlaceRepository) {
        this.bookingMapper = bookingMapper;
        this.bookingRepository = bookingRepository;
        this.parkingPlaceRepository = parkingPlaceRepository;
    }

    @Transactional
    public BookingDto addBooking(BookingDto bookingDto) {
        // Get the parking place from database first (fresh entity)
        ParkingPlace parkingPlace = parkingPlaceRepository.findById(bookingDto.getPlaceId())
                .orElseThrow(() -> new IllegalStateException("Parking place not found"));

        // Check availability
        if (parkingPlace.getStatus() != Status.AVAILABLE) {
            throw new IllegalStateException("Parking place is not available for booking");
        }

        Booking booking = new Booking();
        booking.setParkingPlace(parkingPlace);

        // Update parking place status 
        parkingPlace.setStatus(Status.RESERVED);
        parkingPlace.setAvailablty(false);

        // Save parking place changes
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
        bookingRepository.deleteById(id);
    }
}
