SELECT * FROM restaurant.product;

DESCRIBE restaurant.product;

INSERT INTO product (name, price, category, ingredients, total_quantity, quantity_available)
VALUES ('Pad Thai', 12.99 , 'Noodles', 'lime, peanuts, chicken', 100, 89); 

INSERT INTO product (name, price, category, ingredients, total_quantity, quantity_available)
VALUES ('Fried Rice', 13.99 , 'Rice', 'rice, chicken', 150, 99),('Mango Sticky Rice', 7.99 , 'Desserts', 'Mango, Sticky Rice', 50, 20);

ALTER TABLE product MODIFY name varchar(30);

INSERT INTO product (name, price, category, ingredients, total_quantity, quantity_available)
VALUES ('Spring Rolls (2pcs)', 5.00 , 'Starters', 'mushroom, taro, glass noodles', 100, 30),
('Thai Spring Rolls (4pcs)', 12.00 , 'Starters', 'Tiger shrimp, sour sauce', 40, 20),
('Crispy Tofu', 11.00 , 'Starters', 'tofu, peanut sauce', 60, 35),
('Ice Cream', 6.00 , 'Desserts', 'vanilla, coconut mango, green tea', 70, 55);