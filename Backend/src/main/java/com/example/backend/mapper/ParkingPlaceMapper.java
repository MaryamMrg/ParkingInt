package com.example.backend.mapper;

import com.example.backend.Dto.ParkingPlaceDto;
import com.example.backend.Model.ParkingPlace;
import jdk.dynalink.linker.LinkerServices;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParkingPlaceMapper {



    ParkingPlace toEntity(ParkingPlaceDto parkingPlaceDto);

    ParkingPlaceDto toDto(ParkingPlace parkingPlace);

    List<ParkingPlaceDto> toDtos(List<ParkingPlace> parkingPlaces);
}
