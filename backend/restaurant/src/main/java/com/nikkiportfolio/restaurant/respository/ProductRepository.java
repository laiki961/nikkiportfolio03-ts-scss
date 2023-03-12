package com.nikkiportfolio.restaurant.respository;


import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ProductRepository extends  JpaRepository<ProductEntity, Long> {
    List<ProductEntity> findAll();
    //List<ProductEntity> findByCategory(@RequestParam("category") String category);
    Page<ProductEntity> findByCategory(@RequestParam("category") String category, Pageable pageable);
}
