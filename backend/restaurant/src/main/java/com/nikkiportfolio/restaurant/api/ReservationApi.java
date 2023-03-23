package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("restaurant/api/reservation")
public class ReservationApi {
    Logger logger = LoggerFactory.getLogger(ReservationApi.class);

    @Autowired
    private ReservationService reservationService;

//    @PostMapping("/make-reservation")
//    public ReservationResponseDto postReservation(@RequestBody ReservationInfoRequestDto reservationInfoRequestDto) {
//
//        return new ReservationResponseDto(reservation);
//    }
}
