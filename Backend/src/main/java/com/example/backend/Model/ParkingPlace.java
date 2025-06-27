package com.example.backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ParkingPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  Long number;
    private  Boolean availablty;
    private Status status;

    public ParkingPlace(Long id, Long number, Boolean availablty, Status status) {
        this.id = id;
        this.number = number;
        this.availablty = availablty;
        this.status = status;
    }

    public ParkingPlace() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
