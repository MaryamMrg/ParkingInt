package com.example.backend.Service;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;

import java.util.List;

public interface ParkingService {
    ParkingDto addParking(ParkingDto parkingDto);
    List<ParkingDto> getAllParkings();
    ParkingDto updateParking(Long id,ParkingDto dto);
    ParkingDto searchByName(String name);
    ParkingDto getParkingById(Long id);
    void deleteParking(Long id);
}
