package com.example.backend.repository;

import com.example.backend.Model.ParkingPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParkingPlaceRepository extends JpaRepository<ParkingPlace,Long> {

    List<ParkingPlace> findByParking_Name(String name);

    List<ParkingPlace> findByParking_ParkingId(Long parkingId);


}
