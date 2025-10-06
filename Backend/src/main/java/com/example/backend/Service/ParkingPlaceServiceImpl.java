package com.example.backend.Service;


import com.example.backend.Dto.ParkingPlaceDto;
import com.example.backend.Model.Parking;
import com.example.backend.Model.ParkingPlace;
import com.example.backend.mapper.ParkingPlaceMapper;
import com.example.backend.repository.ParkingPlaceRepository;
import com.example.backend.repository.ParkingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ParkingPlaceServiceImpl implements ParkingPlaceService {

    private final ParkingPlaceMapper parkingPlaceMapper;
    private final ParkingPlaceRepository parkingPlaceRepository;
    private final ParkingRepository parkingService;
    public ParkingPlaceServiceImpl(ParkingPlaceMapper parkingPlaceMapper, ParkingPlaceRepository parkingPlaceRepository, ParkingRepository parkingRepository, ParkingRepository parkingService) {
        this.parkingPlaceMapper = parkingPlaceMapper;
        this.parkingPlaceRepository = parkingPlaceRepository;
        this.parkingService = parkingService;

    }

    public ParkingPlaceDto addPlace(ParkingPlaceDto dto){
        System.out.println("Received DTO: " + dto);

        // Validate parkingId is not null
//        if (dto.getParkingId() == null) {
//            throw new IllegalArgumentException("Parking ID cannot be null");
//        }
        if (dto.getParkingName() == null) {
            throw new IllegalArgumentException("Parking ID cannot be null");
        }

        // Get the ACTUAL parking entity from database
        Parking parking = parkingService.getParkingByNameIgnoreCase(dto.getParkingName());

        // Create entity
        ParkingPlace place = new ParkingPlace();
        place.setPlaceId(null);
        place.setNumber(dto.getNumber());
        place.setAvailablty(dto.getAvailablty());
        place.setStatus(dto.getStatus());
        place.setParking(parking);
        place.setPrice(dto.getPrice());

        System.out.println("Entity before save: placeId=" + place.getPlaceId() +
                ", parkingId=" + (place.getParking() != null ? place.getParking().getParkingId() : "null"));

        // Save the entity
        ParkingPlace saved = parkingPlaceRepository.save(place);

        System.out.println("Entity after save: placeId=" + saved.getPlaceId() +
                ", parkingId=" + (saved.getParking() != null ? saved.getParking().getParkingId() : "null"));

        return parkingPlaceMapper.toDto(saved);
    }

    public List<ParkingPlaceDto> getAllPlaces(){
        List<ParkingPlace> places = parkingPlaceRepository.findAll();
        return parkingPlaceMapper.toDtos(places);
    }
   public List<ParkingPlaceDto> getPlacesByParkingId(Long parkingId){
        List<ParkingPlace> places = parkingPlaceRepository.findByParking_ParkingId(parkingId);
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
        Parking parking = parkingService.getParkingByNameIgnoreCase(dto.getParkingName());
        place.setParking(parking);

        ParkingPlace saved = parkingPlaceRepository.save(place);
        return parkingPlaceMapper.toDto(saved);
    }








    public void deletePlace(Long id){
        parkingPlaceRepository.deleteById(id);
    }
}
