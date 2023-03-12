package com.nikkiportfolio.restaurant.domain;

import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import lombok.Data;

@Data
public class Product {
    private Long id;

    private String name;

    private String category;

    private String ingredients;

    private double price;

    private int totalQuantity;

    private int quantityAvailable;

    public Product(ProductEntity productEntity){
        this.id = productEntity.getId();
        this.name = productEntity.getName();
        this.category = productEntity.getIngredients();
        this.ingredients = productEntity.getIngredients();
        this.price = productEntity.getPrice();
        this.totalQuantity = productEntity.getTotalQuantity();
        this.quantityAvailable = productEntity.getQuantityAvailable();
    }
}
