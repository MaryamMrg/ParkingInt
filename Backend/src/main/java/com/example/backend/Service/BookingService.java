package com.example.backend.Service;

import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;

import java.util.List;

public interface BookingService {
    BookingDto addBooking(BookingDto bookingDto);
    List<BookingDto> getAll();
    BookingDto updateBooking(BookingDto bookingDto,Long id);
    void deleteBooking(Long id);
    List<Booking> findBookingByUserId(Long userId);
}
