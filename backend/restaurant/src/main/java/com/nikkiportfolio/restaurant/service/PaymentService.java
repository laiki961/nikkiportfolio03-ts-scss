package com.nikkiportfolio.restaurant.service;

import com.nikkiportfolio.restaurant.domain.dto.request.PaymentInfoRequestDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;

public interface PaymentService {
    PaymentIntent createPaymentIntent(PaymentInfoRequestDto paymentInfoRequestDto)throws StripeException;
    ResponseEntity<String> stripePayment(String userEmail) throws Exception;
}
