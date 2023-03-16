package com.nikkiportfolio.restaurant.domain.entity;

import com.nikkiportfolio.restaurant.domain.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Table(name="product")
@Data
@NoArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    @Column (name = "name")
    private String name;

    @Column (name = "category")
    private String category;

    @Column (name="description")
    private String description;

    @Column (name = "price")
    private double price;
//
//    @Column(name ="img")
//    private Optional<String> img;

    @Override
    public String toString() {
        return "ProductEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
//                ", img='" + img + '\'' +
                '}';
    }

    public ProductEntity(Long id, String name, String category, String description, double price, Optional<String> img) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
//        this.img = img;
    }


    public ProductEntity(Product product){
        this.name = product.getName();
        this.category = product.getCategory();
        this.description = product.getDescription();
        this.price = product.getPrice();
//        this.img = product.getImg();
    }


}