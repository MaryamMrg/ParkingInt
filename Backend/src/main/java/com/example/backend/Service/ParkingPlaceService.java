package com.example.backend.Service;

import com.example.backend.Dto.ParkingPlaceDto;

import java.util.List;

public interface ParkingPlaceService {

    ParkingPlaceDto addPlace(ParkingPlaceDto placeDto);
    List<ParkingPlaceDto> getAllPlaces();
    ParkingPlaceDto updatePlace(ParkingPlaceDto placeDto,Long id);
    void deletePlace(Long id);
    List<ParkingPlaceDto> getPlacesByParkingId(Long id);
    List<ParkingPlaceDto> getPlacesByP_name(String p_name);

}
