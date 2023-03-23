package com.nikkiportfolio.restaurant.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="reservation")
@Data
@NoArgsConstructor
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    @Column (name = "name")
    private String name;

    @Column (name = "contact")
    private String contact;

    @Column (name ="email")
    private String email;

    @Column (name = "date")
    private Date date;

    @Column (name = "time")
    private String time;
}
