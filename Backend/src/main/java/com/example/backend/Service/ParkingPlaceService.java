package com.example.backend.Service;


import com.example.backend.Dto.ParkingPlaceDto;
import com.example.backend.Model.Parking;
import com.example.backend.Model.ParkingPlace;
import com.example.backend.mapper.ParkingPlaceMapper;
import com.example.backend.repository.ParkingPlaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingPlaceService {

    private final ParkingPlaceMapper parkingPlaceMapper;
    private final ParkingPlaceRepository parkingPlaceRepository;

    public ParkingPlaceService(ParkingPlaceMapper parkingPlaceMapper, ParkingPlaceRepository parkingPlaceRepository) {
        this.parkingPlaceMapper = parkingPlaceMapper;
        this.parkingPlaceRepository = parkingPlaceRepository;
    }

    public ParkingPlaceDto addPlace(ParkingPlaceDto dto){
        ParkingPlace place = parkingPlaceMapper.toEntity(dto);

        ParkingPlace saved = parkingPlaceRepository.save(place);
        return parkingPlaceMapper.toDto(saved);
    }

    public List<ParkingPlaceDto> getAllPlaces(){
        List<ParkingPlace> places = parkingPlaceRepository.findAll();
        return parkingPlaceMapper.toDtos(places);
    }
    public ParkingPlaceDto updatePlace(ParkingPlaceDto dto,Long id){
        ParkingPlace place = parkingPlaceRepository.findById(id).orElseThrow(()->new RuntimeException("place not found"));
        place.setAvailablty(dto.getAvailablty());
        place.setNumber(dto.getNumber());
        place.setStatus(dto.getStatus());

        ParkingPlace saved = parkingPlaceRepository.save(place);
        return parkingPlaceMapper.toDto(saved);
    }

    public void deletePlace(Long id){
        parkingPlaceRepository.deleteById(id);
    }
}
