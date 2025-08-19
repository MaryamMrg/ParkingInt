package com.example.backend.Service;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;
import com.example.backend.mapper.ParkingMapper;
import com.example.backend.repository.ParkingRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
    public List<ParkingDto> getAllParkings(){
        List<Parking> parkings = parkingRepository.findAllByPlaces();
        return parkingMapper.toDtos(parkings);
    }

    public ParkingDto updateParking(Long parkingId, ParkingDto parkingDto) {
        Parking existingParking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

        // Update only the fields that should be manually updated
        existingParking.setP_name(parkingDto.getP_name());
        existingParking.setOpening_hours(parkingDto.getOpening_hours());


        Parking updatedParking = parkingRepository.save(existingParking);
        return parkingMapper.toDto(updatedParking);
    }


    public void deleteParking(Long id){
        parkingRepository.deleteById(id);
    }

    public ParkingDto getParkingById(Long id) {
        Parking parking = parkingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking not found"));

        return parkingMapper.toDto(parking); // Mapper handles the dynamic capacity
    }
}
