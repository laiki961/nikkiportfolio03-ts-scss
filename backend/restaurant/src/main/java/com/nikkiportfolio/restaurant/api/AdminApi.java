package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.dto.request.ProductRequestDto;
import com.nikkiportfolio.restaurant.domain.dto.response.ProductResponseDto;
import com.nikkiportfolio.restaurant.service.AdminService;
import com.nikkiportfolio.restaurant.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http:localhost:3000")
@RestController
@RequestMapping("restaurant/api/admin")
public class AdminApi {

    Logger logger = LoggerFactory.getLogger(AdminApi.class);

    @Autowired
    private AdminService adminService;

    @Autowired
    private ProductService productService;

    //TESTED - WORK
    @PostMapping("/add-product")
    public void postProduct(@RequestBody ProductRequestDto productRequestDto){
        adminService.postProduct(productRequestDto.toProduct());
    }

    //TESTED - WORK
    @DeleteMapping("/remove-product")
    public void removeProduct(@RequestParam(required= true) Long productId) throws Exception{
        adminService.removeProduct(productId);
    }

    //TESTED - WORK
    @PutMapping("/update-product")
    public void updateProduct(@RequestParam(required= true) Long productId,
                              @RequestBody ProductRequestDto productRequestDto) throws Exception{
        Product product = new Product(productRequestDto);
        adminService.updateProduct(productId, product);
    }

    //TESTED - WORK
    @GetMapping("/product/{productId}")
    public ProductResponseDto fetchProduct(@PathVariable(required = true) Long productId){
        logger.debug(productId.toString());
        return new ProductResponseDto(productService.getProduct(productId));
    }
}
