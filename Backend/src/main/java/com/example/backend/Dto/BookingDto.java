package com.example.backend.Dto;

public class BookingDto {

    private Long userId;
    private Long parkingId;
    private Long placeId;
    private Long startTime;
    private Long endTime;

    public BookingDto(Long endTime, Long startTime, Long placeId, Long parkingId, Long userId) {
        this.endTime = endTime;
        this.startTime = startTime;
        this.placeId = placeId;
        this.parkingId = parkingId;
        this.userId = userId;
    }

    public BookingDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getParkingId() {
        return parkingId;
    }

    public void setParkingId(Long parkingId) {
        this.parkingId = parkingId;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }
}
