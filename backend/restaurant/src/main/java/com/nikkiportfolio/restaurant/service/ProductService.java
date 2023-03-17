package com.nikkiportfolio.restaurant.service;

import com.nikkiportfolio.restaurant.domain.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProduct(Long productId);
////    List<Product> getProductsByCategory(String category);


}
