package com.nikkiportfolio.restaurant.service.impl;

import com.nikkiportfolio.restaurant.domain.dto.request.PaymentInfoRequestDto;
import com.nikkiportfolio.restaurant.domain.entity.PaymentEntity;
import com.nikkiportfolio.restaurant.respository.PaymentRepository;
import com.nikkiportfolio.restaurant.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = secretKey;
    }

    public PaymentIntent createPaymentIntent(PaymentInfoRequestDto paymentInfoRequestDto ) throws StripeException{
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequestDto.getAmount());
        params.put("currency", paymentInfoRequestDto.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripePayment(String userEmail) throws Exception{
        PaymentEntity paymentEntity = paymentRepository.findByUserEmail(userEmail);
        if(paymentEntity == null){
            throw  new Exception("Payment information is missing");
        }
        paymentEntity.setAmount(00.00);
        paymentRepository.save(paymentEntity);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
