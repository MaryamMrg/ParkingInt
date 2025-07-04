package com.example.backend.Dto;

public class ParkingDto {


    private String P_name;
    private Long capacity;
    private Long avaible_places;
    private String opening_hours;


    public ParkingDto(String p_name, Long capacity, Long avaible_places, String opening_hours) {
        P_name = p_name;
        this.capacity = capacity;
        this.avaible_places = avaible_places;
        this.opening_hours = opening_hours;
    }

    public ParkingDto() {
    }

    public String getP_name() {
        return P_name;
    }

    public void setP_name(String p_name) {
        P_name = p_name;
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
