package com.nikkiportfolio.restaurant.domain.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ReservationInfoRequestDto {

    private String name;

    private String contact;

    private String email;

    private Date date;

    private String time;
}
