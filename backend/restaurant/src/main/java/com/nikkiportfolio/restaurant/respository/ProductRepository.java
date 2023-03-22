package com.nikkiportfolio.restaurant.respository;


import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends  JpaRepository<ProductEntity, Long> {

    ProductEntity findFirstById(Long productId);
    //List<ProductEntity> findByCategory(@RequestParam("category") String category);
//    Page<ProductEntity> findByCategory(@RequestParam("category") String category, Pageable pageable);

    @Query("select o from ProductEntity o where id in :product_ids")
    List<ProductEntity> findProductsByProductIds(@Param("product_ids") List<Long> productId);


    ProductEntity findTopByOrderByIdDesc();
}
