package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://nikki-portfolio-frontend.s3-website.us-east-2.amazonaws.com","http://localhost:3000", "https://d1u8ufdpmtpp72.cloudfront.net"})
@RestController
@RequestMapping("/public/product")
public class ProductApi {
    Logger logger = LoggerFactory.getLogger(ProductApi.class);

    private ProductService productService;

    @Autowired
    public ProductApi(ProductService productService){
        this.productService = productService;
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
