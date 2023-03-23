package com.nikkiportfolio.restaurant.respository;

import com.nikkiportfolio.restaurant.domain.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
}
