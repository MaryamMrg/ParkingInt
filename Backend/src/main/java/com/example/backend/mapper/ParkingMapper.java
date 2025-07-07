package com.example.backend.mapper;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParkingMapper {



    Parking toEntity(ParkingDto parkingDto);

    ParkingDto toDto(Parking parking);

    List<ParkingDto> toDtos(List<Parking> parkings);
}
