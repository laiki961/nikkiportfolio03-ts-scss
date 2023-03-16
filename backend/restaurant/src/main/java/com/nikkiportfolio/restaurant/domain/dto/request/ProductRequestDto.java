package com.nikkiportfolio.restaurant.domain.dto.request;

import com.nikkiportfolio.restaurant.domain.Product;
import lombok.Data;

@Data
public class ProductRequestDto {
    private String name;

    private String description;

    private String category;

    private double price;

//    private Optional<String> img;

public Product toProduct(){
    Product product = new Product();
    product.setName(name);
    product.setDescription(description);
    product.setCategory(category);
    product.setPrice(price);
//    product.setImg(img);
    return product;
    }
}
