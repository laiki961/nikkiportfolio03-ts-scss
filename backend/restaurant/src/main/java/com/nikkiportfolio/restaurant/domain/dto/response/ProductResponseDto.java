package com.nikkiportfolio.restaurant.domain.dto.response;

import com.nikkiportfolio.restaurant.domain.Product;
import lombok.Data;

@Data
public class ProductResponseDto {
    private Long id;
    private String name;
    private String category;
    private double price;
    private int totalQuantity;
    private int quantityAvailable;

    public ProductResponseDto (Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.category = product.getCategory();
        this.price = product.getPrice();
        this.totalQuantity = product.getTotalQuantity();
        this.quantityAvailable = product.getQuantityAvailable();
    }

    @Override
    public String toString() {
        return "ProductResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", totalQuantity=" + totalQuantity +
                ", quantityAvailable=" + quantityAvailable +
                '}';
    }

}
