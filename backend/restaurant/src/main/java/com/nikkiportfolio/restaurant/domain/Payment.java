package com.nikkiportfolio.restaurant.domain;


import com.nikkiportfolio.restaurant.domain.dto.request.PaymentInfoRequestDto;
import com.nikkiportfolio.restaurant.domain.entity.PaymentEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@NoArgsConstructor
public class Payment {
    Logger logger = LoggerFactory.getLogger(Payment.class);

    private double amount;
    private String currency;
    private String receiptEmail;


    public Payment (PaymentEntity paymentEntity){
        this.amount = paymentEntity.getAmount();
        this.receiptEmail = paymentEntity.getUserEmail();
    }

    public Payment (PaymentInfoRequestDto paymentInfoRequestDto){
        logger.debug(paymentInfoRequestDto.toString());
        this.amount = paymentInfoRequestDto.getAmount()/100;
        this.currency = paymentInfoRequestDto.getCurrency();
        this.receiptEmail = paymentInfoRequestDto.getReceiptEmail();
    }
}
