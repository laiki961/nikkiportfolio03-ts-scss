package com.nikkiportfolio.restaurant.domain;

import com.nikkiportfolio.restaurant.domain.entity.ReservationEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Reservation {
    private Long id;
    private String name;
    private String contact;
    private String email;
    private Date data;
    private Date time;
    private String status;

    public Reservation (ReservationEntity reservationEntity){
this.id = reservationEntity.getId();

    }

//    public Reservation (ReservationInfoRequestDto reservationInfoRequestDto){
//    this.name = reservationInfoRequestDto.getName();
//    }
}
