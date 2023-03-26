package com.nikkiportfolio.restaurant.service.impl;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import com.nikkiportfolio.restaurant.respository.ProductRepository;
import com.nikkiportfolio.restaurant.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {


    @Autowired
    private ProductRepository productRepository;


    @Override
    public List<Product> getAllProducts(){
        List<ProductEntity> products = productRepository.findAll();
        List<Product> productList = new ArrayList<>();
        for(ProductEntity productEntity: products){
            productList.add(new Product(productEntity));
        }
        return productList;
    }

    @Override
    public Product getProductById(Long productId){
        ProductEntity productEntity = productRepository.findFirstById(productId);
        return new Product(productEntity);
    }

//    @Override
//    public List<Product> getProductsByCategory(String category){
//        List<ProductEntity> products = productRepository.findByCategory(category);
//        List<Product> productList = new ArrayList<>();
//
//        return productList;
//    }

}
