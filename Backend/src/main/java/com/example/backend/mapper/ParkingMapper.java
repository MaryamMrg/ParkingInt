package com.example.backend.mapper;

import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParkingMapper {


    @Mapping(target = "parkingId", ignore = true)
    @Mapping(target = "places", ignore = true)
    Parking toEntity(ParkingDto parkingDto);

    @Mapping(target = "capacity", expression = "java(parking.getCapacity())") // This will call the dynamic getCapacity() method
    @Mapping(target = "avaible_places", expression = "java(parking.getAvailablePlaces())") //  dynamic available places
    @Mapping(target = "reserved_places", expression = "java(parking.getReservedPlaces())")
    @Mapping(target = "occupied_places", expression = "java(parking.getOccupiedPlaces())")
    @Mapping(target = "blocked_places", expression = "java(parking.getBlockedPlaces())")
    ParkingDto toDto(Parking parking);

    List<ParkingDto> toDtos(List<Parking> parkings);
}
