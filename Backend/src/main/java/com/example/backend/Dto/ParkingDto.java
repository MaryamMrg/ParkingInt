package com.example.backend.Dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ParkingDto {

    private Long parkingId;

    private String name;
    private Long capacity;
    private Long avaible_places;
    private Long reserved_places;
    private Long occupied_places;
    private Long blocked_places;
    private String opening_hours;

    public Long getParkingId() {
        return parkingId;
    }

    public void setParkingId(Long parkingId) {
        this.parkingId = parkingId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getReserved_places() {
        return reserved_places;
    }

    public void setReserved_places(Long reserved_places) {
        this.reserved_places = reserved_places;
    }

    public Long getBlocked_places() {
        return blocked_places;
    }

    public void setBlocked_places(Long blocked_places) {
        this.blocked_places = blocked_places;
    }

    public Long getOccupied_places() {
        return occupied_places;
    }

    public void setOccupied_places(Long occupied_places) {
        this.occupied_places = occupied_places;
    }



    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getAvaible_places() {
        return avaible_places;
    }

    public void setAvaible_places(Long avaible_places) {
        this.avaible_places = avaible_places;
    }

    public String getOpening_hours() {
        return opening_hours;
    }

    public void setOpening_hours(String opening_hours) {
        this.opening_hours = opening_hours;
    }
}
