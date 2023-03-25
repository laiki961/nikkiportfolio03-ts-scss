package com.nikkiportfolio.restaurant.domain.dto.request;

import lombok.Data;

@Data
public class PaymentInfoRequestDto {
    private int amount;
    private String currency;
    private String receiptEmail;

    @Override
    public String toString() {
        return "PaymentInfoRequestDto{" +
                "amount=" + amount +
                ", currency='" + currency + '\'' +
                ", receiptEmail='" + receiptEmail + '\'' +
                '}';
    }
}
