package com.example.backend.repository;

import com.example.backend.Model.ParkingPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingPlaceRepository extends JpaRepository<ParkingPlace,Long> {
}
