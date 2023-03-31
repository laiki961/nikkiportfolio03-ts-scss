CREATE SCHEMA `restaurant` DEFAULT CHARACTER SET utf8 ;

use restaurant;


DROP TABLE IF EXISTS `product`;
create table product(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(20),
category VARCHAR(10),
description text
);

ALTER TABLE product 
ADD COLUMN reivew_id INT;

ALTER TABLE product
ADD COLUMN img VARCHAR(250);

ALTER TABLE product 
DROP COLUMN img_url ;

ALTER TABLE product 
ADD COLUMN price decimal(2,2);

ALTER TABLE product MODIFY price decimal(4,2);

ALTER TABLE product CHANGE `reivew_id` `review_id` INT;

ALTER TABLE product 
ADD CONSTRAINT KF_reviews
FOREIGN KEY(review_id) REFERENCES review(id);

create table review(
id INT AUTO_INCREMENT PRIMARY KEY,
user_email VARCHAR(45),
date datetime(6),
product_id INT,
rating decimal(3,2),
review_description text,
FOREIGN KEY(product_id) REFERENCES product(id)
);

create table user(
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(45),
first_name VARCHAR(20),
last_name VARCHAR(20),
gender ENUM('M','F'),
phone_no VARCHAR(11),
address_id INT
);

create table address(
id INT AUTO_INCREMENT PRIMARY KEY,
address_name VARCHAR(20),
user_id INT,
street VARCHAR(20),
city VARCHAR(20),
province VARCHAR(10),
zip_code VARCHAR(10),
FOREIGN KEY(user_id) REFERENCES user(id)
);

create table product(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(20),
ingredients VARCHAR(20),
category VARCHAR(20),
review VARCHAR(20),
total_quantity VARCHAR(10),
quantity_available VARCHAR(10),
sale BOOLEAN,
discount VARCHAR(10)
);

create table reservation(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(20),
contact VARCHAR(11),
email VARCHAR(45),
date_time DATETIME
);


show tables;
