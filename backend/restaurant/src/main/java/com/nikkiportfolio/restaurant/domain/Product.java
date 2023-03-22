package com.nikkiportfolio.restaurant.domain;

import com.nikkiportfolio.restaurant.domain.dto.request.ProductRequestDto;
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

//    private Optional<String> img;


    public Product(ProductEntity productEntity){
        this.id = productEntity.getId();
        this.name = productEntity.getName();
        this.category = productEntity.getCategory();
        this.description = productEntity.getDescription();
        this.price = productEntity.getPrice();
//        this.img = productEntity.getImg();
    }

    public Product(ProductRequestDto productRequestDto){
        this.name = productRequestDto.getName();
        this.category = productRequestDto.getCategory();
        this.description = productRequestDto.getDescription();
        this.price = productRequestDto.getPrice();
//        this.img = productRequestDto.getImg();
    }
}
