package com.example.backend.repository;

import com.example.backend.Model.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParkingRepository extends JpaRepository<Parking,Long> {


    @Query("select p from Parking p left join fetch p.places")
    List<Parking> findAllByPlaces();

    Parking getParkingByNameIgnoreCase(String name);
}
