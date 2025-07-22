package com.example.backend.Service;

import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingMapper bookingMapper;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public BookingService(BookingMapper bookingMapper, BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingMapper = bookingMapper;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
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
