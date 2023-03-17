package com.nikkiportfolio.restaurant.api;

import com.nikkiportfolio.restaurant.domain.Product;
import com.nikkiportfolio.restaurant.domain.dto.request.ProductRequestDto;
import com.nikkiportfolio.restaurant.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http:localhost:3000")
@RestController
@RequestMapping("restaurant/api/admin")
public class AdminApi {

    @Autowired
    private AdminService adminService;

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
}
