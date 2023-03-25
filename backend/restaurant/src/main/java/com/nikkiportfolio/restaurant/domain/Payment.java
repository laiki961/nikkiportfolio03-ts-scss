package com.nikkiportfolio.restaurant.domain;


import com.nikkiportfolio.restaurant.domain.dto.request.PaymentInfoRequestDto;
import com.nikkiportfolio.restaurant.domain.entity.PaymentEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Payment {
    private double amount;
    private String currency;
    private String receiptEmail;


    public Payment (PaymentEntity paymentEntity){
        this.amount = paymentEntity.getAmount();
        this.receiptEmail = paymentEntity.getUserEmail();
    }

    public Payment (PaymentInfoRequestDto paymentInfoRequestDto){
        this.amount = paymentInfoRequestDto.getAmount();
        this.currency = paymentInfoRequestDto.getCurrency();
        this.receiptEmail = paymentInfoRequestDto.getReceiptEmail();
    }
}
