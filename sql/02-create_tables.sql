use restaurant;

DROP TABLE IF EXISTS `product`;
create table product(
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(50),
`category` VARCHAR(10),
`description` text,
`price` decimal(4,2),
`img` MEDIUMBLOB  DEFAULT NULL
);

create table `payment`(
`id` INT AUTO_INCREMENT PRIMARY KEY,
`user_name` VARCHAR(45),
`amount` DECIMAL(10,2)
);


DROP TABLE IF EXISTS `reservation`;
create table reservation(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
contact VARCHAR(30),
email VARCHAR(30),
persons INT,
date_time DATETIME
);

create table `order`(
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
total_value decimal(5,2),
created_at DATETIME
);

create table order_detail(
order_id INT NOT NULL,
product_id INT NOT NULL,
FOREIGN KEY(order_id) references `order`(id),
FOREIGN KEY(product_id) references product(id)
);

