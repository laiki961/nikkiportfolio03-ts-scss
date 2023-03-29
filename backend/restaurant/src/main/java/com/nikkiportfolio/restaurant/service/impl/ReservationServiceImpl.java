package com.nikkiportfolio.restaurant.service.impl;

import com.nikkiportfolio.restaurant.domain.Reservation;
import com.nikkiportfolio.restaurant.domain.entity.ReservationEntity;
import com.nikkiportfolio.restaurant.respository.ReservationRepository;
import com.nikkiportfolio.restaurant.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {
    Logger logger = LoggerFactory.getLogger(ReservationServiceImpl.class);

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Long makeReservation(Reservation reservation){
        ReservationEntity reservationEntity = new ReservationEntity(reservation);
        logger.error(reservationEntity.toString());
        reservationRepository.save(reservationEntity);
        return reservationEntity.getId();
    }

}
