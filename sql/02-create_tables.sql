use restaurant;

DROP TABLE IF EXISTS `reservation`;
create table reservation(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
contact VARCHAR(30),
email VARCHAR(30),
persons INT,
date_time DATETIME
);

create table order_history(
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
total_value decimal(5,2),
ordered_datetime DATETIME,
FOREIGN KEY(order_id) references order_detail(order_id)
);

create table order_detail(
order_id INT NOT NULL,
product_id INT NOT NULL,
FOREIGN KEY(order_id) references order_history(id),
FOREIGN KEY(product_id) references product(id)
);

