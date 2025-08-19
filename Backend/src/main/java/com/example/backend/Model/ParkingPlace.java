package com.example.backend.Model;

import jakarta.persistence.*;

@Entity
public class ParkingPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;

    private  Long number;
    private  Boolean availablty;
    private Status status;

    @ManyToOne
    @JoinColumn(name = "parkingId")
    private  Parking parking;

    public ParkingPlace(Long placeId, Long number, Boolean availablty, Status status) {
        this.placeId = placeId;
        this.number = number;
        this.availablty = availablty;
        this.status = status;
    }

    public ParkingPlace() {
    }

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Boolean getAvailablty() {
        return availablty;
    }

    public void setAvailablty(Boolean availablty) {
        this.availablty = availablty;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
