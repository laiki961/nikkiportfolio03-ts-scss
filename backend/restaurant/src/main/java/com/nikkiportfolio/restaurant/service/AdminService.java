package com.nikkiportfolio.restaurant.service;

import com.nikkiportfolio.restaurant.domain.Product;

public interface AdminService {
   Product postProduct(Product product);
//   void postProduct(Product product);
   void removeProduct(Long productId) throws Exception;
   void updateProduct (Long productId, Product product) throws Exception;

}
