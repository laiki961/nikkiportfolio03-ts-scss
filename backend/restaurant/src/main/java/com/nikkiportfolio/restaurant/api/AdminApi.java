package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.dto.request.ProductRequestDto;
import com.nikkiportfolio.restaurant.domain.dto.response.ProductResponseDto;
import com.nikkiportfolio.restaurant.service.AdminService;
import com.nikkiportfolio.restaurant.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http:localhost:3000")
@RestController
@RequestMapping("restaurant/api/admin")
public class AdminApi {

    @Autowired
    private ProductService productService;

    @Autowired
    private AdminService adminService;

    @PostMapping("/add-product")
    public ProductResponseDto postProduct(@RequestBody ProductRequestDto productRequestDto){
        Product product = adminService.postProduct(productRequestDto.toProduct());
        return new ProductResponseDto(product);
    }
}
