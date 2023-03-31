package com.nikkiportfolio.restaurant.domain.entity;

import com.nikkiportfolio.restaurant.domain.Reservation;
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

    @Column (name ="date_time", columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @Column (name = "persons")
    private Integer persons;


    public ReservationEntity(Reservation reservation){
        this.name = reservation.getName();
        this.contact = reservation.getContact();
        this.email = reservation.getEmail();
        this.dateTime = reservation.getDateTime();
        this.persons = reservation.getPersons();
    }
}
