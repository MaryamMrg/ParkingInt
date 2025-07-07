package com.example.backend.mapper;

import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;

import java.util.List;

public interface BookingMapper {

Booking toEntity(BookingDto bookingDto);

BookingDto toDto(Booking booking);

List<BookingDto> toDtos(List<Booking> bookings);
}
