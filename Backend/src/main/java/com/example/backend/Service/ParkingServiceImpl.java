package com.example.backend.Service;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;
import com.example.backend.mapper.ParkingMapper;
import com.example.backend.repository.ParkingRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ParkingServiceImpl  implements ParkingService{

    private final ParkingMapper parkingMapper;
    private final ParkingRepository parkingRepository;

    public ParkingServiceImpl(ParkingMapper parkingMapper, ParkingRepository parkingRepository) {
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

    public ParkingDto searchByName(String name){
        Parking parking = parkingRepository.getParkingByNameIgnoreCase(name);
        if(parking == null) {
            throw new EntityNotFoundException("Parking not found with name: " + name);
        }

        return parkingMapper.toDto(parking);
    }
    public ParkingDto updateParking(Long parkingId, ParkingDto parkingDto) {
        Parking existingParking = parkingRepository.findById(parkingId)
                .orElseThrow(() -> new RuntimeException("Parking not found with id: " + parkingId));

        // Update only the fields that should be manually updated
        existingParking.setName(parkingDto.getName());
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
