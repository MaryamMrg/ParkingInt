package com.example.backend.Service;


import com.example.backend.Dto.ParkingPlaceDto;
import com.example.backend.Model.Parking;
import com.example.backend.Model.ParkingPlace;
import com.example.backend.mapper.ParkingPlaceMapper;
import com.example.backend.repository.ParkingPlaceRepository;
import com.example.backend.repository.ParkingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingPlaceService {

    private final ParkingPlaceMapper parkingPlaceMapper;
    private final ParkingPlaceRepository parkingPlaceRepository;
    private final ParkingRepository parkingRepository;
    public ParkingPlaceService(ParkingPlaceMapper parkingPlaceMapper, ParkingPlaceRepository parkingPlaceRepository, ParkingRepository parkingRepository) {
        this.parkingPlaceMapper = parkingPlaceMapper;
        this.parkingPlaceRepository = parkingPlaceRepository;
        this.parkingRepository = parkingRepository;
    }

    public ParkingPlaceDto addPlace(ParkingPlaceDto dto){
        System.out.println("Received DTO: " + dto);

        // ADDED: Validate parkingId is not null
        if (dto.getParkingId() == null) {
            throw new IllegalArgumentException("Parking ID cannot be null");
        }

        // ADDED: Validate that parking exists
        Optional<Parking> parkingOptional = parkingRepository.findById(dto.getParkingId());
        if (!parkingOptional.isPresent()) {
            throw new IllegalArgumentException("Parking with ID " + dto.getParkingId() + " not found");
        }

        // Convert DTO to Entity
        ParkingPlace place = parkingPlaceMapper.toEntity(dto);

        // ADDED: Explicitly set the parking relationship to ensure it's not null
        place.setParking(parkingOptional.get());

        System.out.println("Entity before save: placeId=" + place.getPlaceId() +
                ", parkingId=" + (place.getParking() != null ? place.getParking().getParkingId() : "null"));

        ParkingPlace saved = parkingPlaceRepository.save(place);

        System.out.println("Entity after save: placeId=" + saved.getPlaceId() +
                ", parkingId=" + (saved.getParking() != null ? saved.getParking().getParkingId() : "null"));

        return parkingPlaceMapper.toDto(saved);
    }

    public List<ParkingPlaceDto> getAllPlaces(){
        List<ParkingPlace> places = parkingPlaceRepository.findAll();
        return parkingPlaceMapper.toDtos(places);
    }

    public List<ParkingPlaceDto> getPlacesByP_name(String p_name){
        List<ParkingPlace> places = parkingPlaceRepository.findByParking_Name(p_name);
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
