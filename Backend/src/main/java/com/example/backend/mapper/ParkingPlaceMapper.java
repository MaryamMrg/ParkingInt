package com.example.backend.mapper;

import com.example.backend.Dto.ParkingPlaceDto;
import com.example.backend.Model.Parking;
import com.example.backend.Model.ParkingPlace;
import jdk.dynalink.linker.LinkerServices;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParkingPlaceMapper {



    @Mapping(source = "parking.parkingId", target = "parkingId")
    @Mapping(source = "parking.name", target = "parkingName")
    ParkingPlaceDto toDto(ParkingPlace parkingPlace);

    @Mapping(target = "parking", ignore = true)
    ParkingPlace toEntity(ParkingPlaceDto dto);

    List<ParkingPlaceDto> toDtos(List<ParkingPlace> parkingPlaces);

    @Named("mapParkingId")
    default Parking mapParkingId(Long parkingId) {
        if (parkingId == null) {
            return null;
        }
        Parking parking = new Parking();
        parking.setParkingId(parkingId);
        return parking;
    }}