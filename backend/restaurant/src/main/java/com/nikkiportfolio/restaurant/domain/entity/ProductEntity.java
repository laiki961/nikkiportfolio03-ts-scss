package com.nikkiportfolio.restaurant.domain.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="product")
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    @Column (name = "name")
    private String name;

    @Column (name = "category")
    private String category;

    @Column (name="ingredients")
    private String ingredients;

    @Column (name = "price")
    private double price;

    @Column (name="totalQuantity")
    private int totalQuantity;

    @Column (name = "quantityAvailable")
    private int quantityAvailable;

    @Override
    public String toString() {
        return "ProductEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", ingredients='" + ingredients + '\'' +
                ", price=" + price +
                ", totalQuantity=" + totalQuantity +
                ", quantityAvailable=" + quantityAvailable +
                '}';
    }
}
