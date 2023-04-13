package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.Reservation;
import com.nikkiportfolio.restaurant.domain.dto.request.ReservationInfoRequestDto;
import com.nikkiportfolio.restaurant.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = {"http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com","http://lcoalhost:3000"})
@RestController
@RequestMapping("restaurant/api/reservation")
public class ReservationApi {
    Logger logger = LoggerFactory.getLogger(ReservationApi.class);

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/make-reservation")
    public Long postReservation(@RequestBody ReservationInfoRequestDto reservationInfoRequestDto) throws ParseException {
        Long reservationId =  reservationService.makeReservation(new Reservation(reservationInfoRequestDto));
        return reservationId;
    }
}
