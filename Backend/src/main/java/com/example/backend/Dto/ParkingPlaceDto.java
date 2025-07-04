package com.example.backend.Dto;

import com.example.backend.Model.Status;

public class ParkingPlaceDto {


    private  Long number;
    private  Boolean availablty;
    private Status status;


    public ParkingPlaceDto(Long number, Boolean availablty, Status status) {
        this.number = number;
        this.availablty = availablty;
        this.status = status;
    }

    public ParkingPlaceDto() {
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
