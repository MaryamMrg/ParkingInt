package com.example.backend.Controller;


import com.example.backend.Dto.BookingDto;
import com.example.backend.Service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }


    @PostMapping
    public BookingDto AddBooking(@RequestBody BookingDto dto){
        return bookingService.addBooking(dto);
    }

    @GetMapping("/all")
    public List<BookingDto> getAllBookings(){
        return bookingService.getAll();
    }


    @PutMapping("/update/{id}")
    public BookingDto updateBooking(@RequestBody BookingDto dto ,@PathVariable Long id){
        return bookingService.updateBooking(dto,id);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id){
        bookingService.deleteBooking(id);
    }
}
