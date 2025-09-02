package com.example.backend.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parkingId;

    private String name;

//    private Long avaible_places;

    private String opening_hours;



    @OneToMany(mappedBy = "parking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ParkingPlace> places = new ArrayList<ParkingPlace>();

    public Long getParkingId() {
        return parkingId;
    }

    public void setParkingId(Long parkingId) {
        this.parkingId = parkingId;
    }

    public List<ParkingPlace> getPlaces() {
        return places;
    }

    public void setPlaces(List<ParkingPlace> places) {
        this.places = places;
    }

    public String getOpening_hours() {
        return opening_hours;
    }

    public void setOpening_hours(String opening_hours) {
        this.opening_hours = opening_hours;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCapacity() {
        return (long) places.size();
    }

    public Long getAvailablePlaces() {
        if (places == null || places.isEmpty()) {
            return 0L;
        }

        return places.stream()
                .filter(place -> place != null &&
                        place.getStatus() != null &&
                        place.getStatus() == Status.AVAILABLE)
                .count();
    }

    public Long getReservedPlaces() {
        if (places == null || places.isEmpty()) {
            return 0L;
        }

        return places.stream()
                .filter(place -> place != null &&
                        place.getStatus() != null &&
                        place.getStatus() == Status.RESERVED)
                .count();
    }

    public Long getOccupiedPlaces() {
        if (places == null || places.isEmpty()) {
            return 0L;
        }

        return places.stream()
                .filter(place -> place != null &&
                        place.getStatus() != null &&
                        place.getStatus() == Status.OCCUPIED)
                .count();
    }

    public Long getBlockedPlaces() {
        if (places == null || places.isEmpty()) {
            return 0L;
        }

        return places.stream()
                .filter(place -> place != null &&
                        place.getStatus() != null &&
                        place.getStatus() == Status.BLOCKED)
                .count();
    }
}
