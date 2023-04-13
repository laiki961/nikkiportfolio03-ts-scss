package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.dto.request.PaymentInfoRequestDto;
import com.nikkiportfolio.restaurant.service.PaymentService;
import com.nikkiportfolio.restaurant.utils.ExtractJWT;
import com.stripe.model.PaymentIntent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = {"http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com","http://localhost:3000"})
@RestController
@RequestMapping("restaurant/api/payment/secure")
public class PaymentApi {
    Logger logger = LoggerFactory.getLogger(PaymentApi.class);

    private PaymentService paymentService;

    @Autowired
    public PaymentApi( PaymentService paymentService){
        this.paymentService = paymentService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequestDto paymentInfoRequest) throws Exception{
        logger.error(paymentInfoRequest.toString());
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value="Authorization") String token) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}
