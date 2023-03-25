package com.nikkiportfolio.restaurant.domain.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductRequestDto {
    private String name;

    private String description;

    private String category;

    private double price;

    private String img;

    @Override
    public String toString() {
        return "ProductRequestDto{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", img='" + img + '\'' +
                '}';
    }
}
