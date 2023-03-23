package com.nikkiportfolio.restaurant.respository;

import com.nikkiportfolio.restaurant.domain.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    PaymentEntity findByUserEmail(String userEmail);
}
