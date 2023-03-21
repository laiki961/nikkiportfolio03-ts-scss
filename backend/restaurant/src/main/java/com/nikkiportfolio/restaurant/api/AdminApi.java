package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.dto.request.ProductRequestDto;
import com.nikkiportfolio.restaurant.domain.dto.response.ProductResponseDto;
import com.nikkiportfolio.restaurant.service.AdminService;
import com.nikkiportfolio.restaurant.service.ProductService;
import com.nikkiportfolio.restaurant.utils.ExtractJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("restaurant/api/admin/secure")
public class AdminApi {

    Logger logger = LoggerFactory.getLogger(AdminApi.class);

    @Autowired
    private AdminService adminService;

    @Autowired
    private ProductService productService;

    //TESTED - WORK
    @PostMapping("/add-product")
    public void postProduct(@RequestHeader(value="Authorization") String token,
                            @RequestBody ProductRequestDto productRequestDto) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.postProduct(productRequestDto.toProduct());
    }

    //TESTED - WORK
    @DeleteMapping("/remove-product")
    public void removeProduct(@RequestHeader(value="Authorization") String token,
                              @RequestParam(required= true) Long productId) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.removeProduct(productId);
    }

    //TESTED - WORK
    @PutMapping("/update-product")
    public void updateProduct(@RequestHeader(value="Authorization") String token,
                              @RequestParam(required= true) Long productId,
                              @RequestBody ProductRequestDto productRequestDto) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
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
