package com.example.backend.Service;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;
import com.example.backend.mapper.ParkingMapper;
import com.example.backend.repository.ParkingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingService {

    private final ParkingMapper parkingMapper;
    private final ParkingRepository parkingRepository;

    public ParkingService(ParkingMapper parkingMapper, ParkingRepository parkingRepository) {
        this.parkingMapper = parkingMapper;
        this.parkingRepository = parkingRepository;
    }

    public ParkingDto addParking(ParkingDto parkingDto){
        Parking parking =  parkingMapper.toEntity(parkingDto);
        Parking saved = parkingRepository.save(parking);
        return parkingMapper.toDto(saved);

    }

    public List<ParkingDto> getAllParkings(){
        List<Parking> parkings = parkingRepository.findAll();
        return parkingMapper.toDtos(parkings);
    }

    public ParkingDto updateParking(ParkingDto dto,Long id){
        Parking parking = parkingRepository.findById(id).orElseThrow(()->new RuntimeException("parking not found"));
        parking.setAvaible_places(dto.getAvaible_places());
        parking.setCapacity(dto.getCapacity());
        parking.setOpening_hours(dto.getOpening_hours());
        parking.setP_name(dto.getP_name());

        Parking saved = parkingRepository.save(parking);
        return parkingMapper.toDto(saved);
    }

    public void deleteParking(Long id){
        parkingRepository.deleteById(id);
    }
}
