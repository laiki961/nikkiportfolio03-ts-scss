SELECT * FROM restaurant.product;

DESCRIBE restaurant.product;

INSERT INTO product (name, price, category, description, total_quantity, quantity_available)
VALUES ('Pad Thai', 12.99 , 'Noodles', 'lime, peanuts, chicken', 100, 89); 

ALTER TABLE product MODIFY name varchar(30);

use restaurant;
INSERT INTO product (name, price, category, description)VALUES 
('Pad Thai', 12.99 , 'Noodles', 'lime, peanuts, chicken'),
('Fried Rice', 13.99 , 'Rice', 'rice, chicken'),
('Mango Sticky Rice', 7.99 , 'Desserts', 'Mango, Sticky Rice'),
('Spring Rolls (2pcs)', 5.00 , 'Starters', 'mushroom, taro, glass noodles'),
('Thai Spring Rolls (4pcs)', 12.00 , 'Starters', 'Tiger shrimp, sour sauce'),
('Crispy Tofu', 11.00 , 'Starters', 'tofu, peanut sauce'),
('Ice Cream', 6.00 , 'Desserts', 'vanilla, coconut mango, green tea');