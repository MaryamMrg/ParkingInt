package com.example.backend.Controller;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Service.ParkingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parking")
@CrossOrigin(origins = "http://localhost:4200")

public class ParkingController {

    private final ParkingService parkingService;

    public ParkingController(ParkingService parkingService) {
        this.parkingService = parkingService;
    }

    @PostMapping("/add")
    public ParkingDto addParking(@RequestBody ParkingDto parkingDto){
        return parkingService.addParking(parkingDto);
    }


    @GetMapping("/all")
    public List<ParkingDto> getAllParkings(){
        return parkingService.getAllParkings();
    }

    @GetMapping("/searchByName")
    public ResponseEntity<ParkingDto> searchByName(@RequestParam String name) {
        try {
            ParkingDto parking = parkingService.searchByName(name);
            return ResponseEntity.ok(parking);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/update/{id}")
    public ParkingDto updateParking(@RequestBody ParkingDto parkingDto,@PathVariable Long id){
        return parkingService.updateParking(id,parkingDto);
    }


    @DeleteMapping("/{id}")
    public void deleteParking(@PathVariable Long id){
        parkingService.deleteParking(id);
    }
}
