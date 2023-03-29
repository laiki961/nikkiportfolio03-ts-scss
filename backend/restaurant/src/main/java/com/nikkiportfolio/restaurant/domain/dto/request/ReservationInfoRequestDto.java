package com.nikkiportfolio.restaurant.domain.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservationInfoRequestDto {

    private String name;

    private String contact;

    private String email;

    private String date;

    private String time;

    @Override
    public String toString() {
        return "ReservationInfoRequestDto{" +
                "name='" + name + '\'' +
                ", contact='" + contact + '\'' +
                ", email='" + email + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
