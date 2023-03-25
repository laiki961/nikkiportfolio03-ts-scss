package com.nikkiportfolio.restaurant.domain.entity;

import com.nikkiportfolio.restaurant.domain.Payment;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="amount")
    private double amount;


    public PaymentEntity(Payment payment){
        this.userEmail = payment.getReceiptEmail();
        this.amount = payment.getAmount();
    }
}
