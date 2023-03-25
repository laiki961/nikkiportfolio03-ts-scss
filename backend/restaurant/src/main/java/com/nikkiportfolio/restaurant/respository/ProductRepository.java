package com.nikkiportfolio.restaurant.respository;


import com.nikkiportfolio.restaurant.domain.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ProductRepository extends  JpaRepository<ProductEntity, Long> {

    ProductEntity findFirstById(Long productId);

    @Query("select o from ProductEntity o where id in :product_ids")
    List<ProductEntity> findProductsByProductIds(@Param("product_ids") List<Long> productId);

    // return the last item being added to the repository
    ProductEntity findTopByOrderByIdDesc();

    //search products by name
    //http://localhost:8787/restaurant/api/productEntities/search/findByNameContaining?name=Fried
    Page<ProductEntity> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    //search products by category
    //http://localhost:8787/restaurant/api/productEntities/search/findByCategory?category=Rice
    Page<ProductEntity> findByCategory(@RequestParam("category") String category, Pageable pageable);
    //List<ProductEntity> findByCategory(@RequestParam("category") String category);
}
