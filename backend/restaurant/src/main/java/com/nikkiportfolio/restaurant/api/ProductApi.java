package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.dto.response.ProductResponseDto;
import com.nikkiportfolio.restaurant.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/public/product")
public class ProductApi {
    Logger logger = LoggerFactory.getLogger(ProductApi.class);

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public List<ProductResponseDto> fetchAllProducts(){
        List<ProductResponseDto> responseDtos = new ArrayList<>();
        List<Product> products = productService.getAllProducts();
        for(Product product: products){
            ProductResponseDto dto = new ProductResponseDto(product);
            responseDtos.add(dto);
        }
        return responseDtos;
    }

//    @GetMapping("/{category}")
//    public List<ProductResponseDto> fetchProductsByCategory(@RequestParam (required = true) String category){
//        List<ProductResponseDto> responseDtos = new ArrayList<>();
//        List<Product> products = productService.getProductsByCategory(category);
//        for(Product product: products){
//            ProductResponseDto dto = new ProductResponseDto(product);
//            responseDtos.add(dto);
//        }
//        return responseDtos;
//    }

}
