package com.nikkiportfolio.restaurant.domain.dto.response;

import com.nikkiportfolio.restaurant.domain.Product;
import lombok.Data;

@Data
public class ProductResponseDto {
    private Long id;
    private String name;
    private String category;
    private String description;
    private double price;



    public ProductResponseDto (Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.category = product.getCategory();
        this.description = product.getDescription();
        this.price = product.getPrice();
    }

    @Override
    public String toString() {
        return "ProductResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                '}';
    }

}
