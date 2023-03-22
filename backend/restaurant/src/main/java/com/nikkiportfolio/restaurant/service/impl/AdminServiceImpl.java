package com.nikkiportfolio.restaurant.service.impl;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import com.nikkiportfolio.restaurant.respository.ProductRepository;
import com.nikkiportfolio.restaurant.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product postProduct(Product product){
        ProductEntity productEntity = new ProductEntity(product);
        productRepository.save(productEntity);
        return new Product(productRepository.findTopByOrderByIdDesc());
//        return new Product(productEntity); //should be void
    }


//    @Override
//    public void postProduct(Product product) {
//        ProductEntity productEntity = new ProductEntity(product);
//        productRepository.save(productEntity);
//    }

    @Override
    public void removeProduct(Long productId)throws Exception{
        Optional<ProductEntity> product = productRepository.findById(productId);
        if(!product.isPresent()){
            throw new Exception("Product not found!");
        }
        productRepository.delete(product.get());
    }

    @Override
    public void updateProduct(Long productId, Product updatedProduct)throws Exception {
        Optional<ProductEntity> existingProduct = productRepository.findById(productId);
        if (!existingProduct.isPresent()) {
            throw new Exception("Book not found");
        }
        existingProduct.get().setName(updatedProduct.getName());
        existingProduct.get().setDescription(updatedProduct.getDescription());
        existingProduct.get().setCategory(updatedProduct.getCategory());
        existingProduct.get().setPrice(updatedProduct.getPrice());
        productRepository.save(existingProduct.get());
    }



}
