package com.nikkiportfolio.restaurant.domain;

import com.nikkiportfolio.restaurant.domain.dto.request.ReservationInfoRequestDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
public class Reservation {
    Logger logger = LoggerFactory.getLogger(Reservation.class);

    private Long id;
    private String name;
    private String contact;
    private String email;
    private Date dateTime;

    public Reservation (ReservationInfoRequestDto reservationInfoRequestDto) throws ParseException {
        this.name = reservationInfoRequestDto.getName();
        this.contact = reservationInfoRequestDto.getContact();
        this.email = reservationInfoRequestDto.getEmail();
        String dateString = reservationInfoRequestDto.getDate();
        String timeString = reservationInfoRequestDto.getTime();
        String combined = dateString + " " + timeString;
        this.dateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(combined);
        logger.error(this.dateTime.toString());
    }


}
