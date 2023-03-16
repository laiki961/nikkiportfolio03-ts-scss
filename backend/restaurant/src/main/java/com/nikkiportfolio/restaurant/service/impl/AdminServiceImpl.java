package com.nikkiportfolio.restaurant.service.impl;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import com.nikkiportfolio.restaurant.respository.ProductRepository;
import com.nikkiportfolio.restaurant.service.AdminService;
import com.nikkiportfolio.restaurant.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Override
    public Product postProduct(Product product){
        ProductEntity productEntity = new ProductEntity(product);
        productRepository.save(productEntity);
        return new Product(productEntity);
    }
}
