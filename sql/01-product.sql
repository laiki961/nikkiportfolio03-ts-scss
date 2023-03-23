CREATE DATABASE  IF NOT EXISTS `restaurant` /*!40100 DEFAULT CHARACTER SET latin1 */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

use restaurant;
DROP TABLE IF EXISTS `product`;
create table product(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
category VARCHAR(10),
description text,
price decimal(4,2)
);


use restaurant;
INSERT INTO product (name, price, category, description)VALUES 
('Pad Thai', 12.99 , 'Noodles', 'Red-flame stir-fried rice noodles in a house-made tamarind-palm sugar sauce with beansprouts, tofu, egg, chives, long leaf coriander, shredded cabbage, fresh lime, and house-roasted peanuts. Choice of Chicken, Beef, Shrimp, or Tofu & Veggies. (contains oyster sauce) Choice of No Spice, Mild, Medium, Farang Spicy, or Thai Spicy. Gluten-free/Peanut-free available upon request.'),
('Fried Rice', 13.99 , 'Rice', 'Stir fry rice with egg, fresh pineapple, onions, green onions and cashew nuts'),
('Mango Sticky Rice', 7.99 , 'Desserts', 'Coconut sticky rice topped with fresh mango and cahews'),
('Spring Rolls (2pcs)', 5.00 , 'Starters', 'Deep fried vegetarian Thai pastry paper wraps, mushrooms, taro glass noodles, carrots and cabbage served with homemade Thai sweet and sour sauce.'),
('Thai Spring Rolls (4pcs)', 12.00 , 'Starters', 'Tiger shrimp, sour sauce'),
('Crispy Tofu', 11.00 , 'Starters', 'Deep-fried marinated tofu. Served with delicious peanut sauce.'),
('Ice Cream', 6.00 , 'Desserts', 'vanilla, coconut mango, green tea'),
('Thai Basil Fried Rice', 5.99, 'Rice', 'Stir fried rice with egg, onions, green onions, red peppers, tomatoes, Chinese broccoli, and Thai basil.'),
('Tom Yum Pad Thai', 18.00, 'Noodles', 'Stir fried Thai rice noodles with tom yum paste. Served with fresh lime, green onion, fresh bean sprouts and roasted peanuts.'),
('Curry Pad Thai', 19.00, 'Noodles', 'Stir fried Thai rice noodles cooked with egg, tofu, tamarind sauce and enriched golden curry sauce. Served with fresh lime, green onion, fresh bean sprouts and roasted peanuts.');