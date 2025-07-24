package com.example.backend.Controller;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Service.ParkingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parking")
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

    @PutMapping("/update/{id}")
    public ParkingDto updateParking(@RequestBody ParkingDto parkingDto,@PathVariable Long id){
        return parkingService.updateParking(parkingDto,id);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteparking(@PathVariable Long id){
        parkingService.deleteParking(id);
    }
}
