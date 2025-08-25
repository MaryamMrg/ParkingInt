package com.example.backend.Controller;


import com.example.backend.Dto.BookingDto;
import com.example.backend.Model.Booking;
import com.example.backend.Model.User;
import com.example.backend.Service.BookingService;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }


    @PostMapping
    public BookingDto addBooking(@RequestBody BookingDto dto){
        return bookingService.addBooking(dto);
    }

    @GetMapping("/all")
    public List<BookingDto> getAllBookings(){
        return bookingService.getAll();
    }

    @GetMapping("/myBookings/{id}")
   public List<Booking> getMyBookings(@PathVariable Long id){
        return bookingService.findBookingByUserId(id);
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
