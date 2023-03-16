package com.nikkiportfolio.restaurant.domain;

import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class Product {

    private Long id;

    private String name;

    private String category;

    private String description;

    private double price;
//
//    @Column(name="img")
//    private Optional<String> img;

    public Product(ProductEntity productEntity){
        this.id = productEntity.getId();
        this.name = productEntity.getName();
        this.category = productEntity.getCategory();
        this.description = productEntity.getDescription();
        this.price = productEntity.getPrice();
//        this.img = productEntity.getImg();
    }
}
