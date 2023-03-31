package com.nikkiportfolio.restaurant.domain.dto.response;

import com.nikkiportfolio.restaurant.domain.Reservation;

public class ReservationResponseDto {
    private Long id;
//    private String status;

    public ReservationResponseDto (Reservation reservation){
        this.id = reservation.getId();
//        this.status = reservation.getStatus();
    }
}
