package com.nikkiportfolio.restaurant.domain;

import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="category")
    private String category;

    @Column(name="description")
    private String description;

    @Column(name="price")
    private double price;

    public Product(ProductEntity productEntity){
        this.id = productEntity.getId();
        this.name = productEntity.getName();
        this.category = productEntity.getCategory();
        this.description = productEntity.getDescription();
        this.price = productEntity.getPrice();
    }
}
