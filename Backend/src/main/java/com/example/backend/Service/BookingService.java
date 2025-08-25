package com.example.backend.Service;

import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingMapper bookingMapper;
    private final BookingRepository bookingRepository;

    public BookingService(BookingMapper bookingMapper, BookingRepository bookingRepository) {
        this.bookingMapper = bookingMapper;
        this.bookingRepository = bookingRepository;

    }

    public BookingDto addBooking(BookingDto bookingDto){
        Booking booking = bookingMapper.toEntity(bookingDto);

        Booking saved = bookingRepository.save(booking);
        return bookingMapper.toDto(saved);
    }

    public List<BookingDto> getAll(){
        List<Booking> bookings = bookingRepository.findAll();
        return bookingMapper.toDtos(bookings);
    }

    public List<Booking> findBookingByUserId(Long Id){
        return bookingRepository.findByUserId(Id);
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
