package com.example.backend.Controller;

import com.example.backend.Dto.ParkingPlaceDto;
import com.example.backend.Service.ParkingPlaceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/place")
@CrossOrigin(origins = "http://localhost:4200")
public class ParkingPlaceController {

    private final ParkingPlaceService parkingPlaceService;

    public ParkingPlaceController(ParkingPlaceService parkingPlaceService) {
        this.parkingPlaceService = parkingPlaceService;
    }


    @PostMapping("/add")
    public ParkingPlaceDto addPlace(@RequestBody ParkingPlaceDto dto){
        return parkingPlaceService.addPlace(dto);
    }

    @GetMapping("/all")
    public List<ParkingPlaceDto> getAllPlaces(){
        return parkingPlaceService.getAllPlaces();
    }

    @GetMapping("placeBypName")
    public List<ParkingPlaceDto> getPlacesByP_name(@RequestParam String name){
        return parkingPlaceService.getPlacesByP_name(name);
    }

    @PutMapping("/update/{id}")
    public ParkingPlaceDto updatePlace(@RequestBody ParkingPlaceDto dto,@PathVariable Long id){
        return parkingPlaceService.updatePlace(dto,id);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlace(@PathVariable Long id){
        parkingPlaceService.deletePlace(id);
    }
}


