-- DROP DATABASE IF EXISTS bamazon;
-- CREATE DATABASE bamazon;

USE bamazon;

-- CREATE TABLE products(
--   item_id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(100) NOT NULL,
--   department_name VARCHAR(100) NOT NULL,
--   price DECIMAL(19,2) NOT NULL DEFAULT 0,
--   stock_quantity INT NOT NULL DEFAULT 0,
--   PRIMARY KEY (item_id)
-- );


-- CREATE TABLE departments(
-- 	department_id INTEGER AUTO_INCREMENT NOT NULL,
-- 	department_name VARCHAR(50) NOT NULL,
-- 	over_head_costs FLOAT(8) NOT NULL,
-- 	product_sales FLOAT(8) DEFAULT 0,
-- 	product_cost FLOAT(8) DEFAULT 0,
-- 	total_profit FLOAT(8) DEFAULT 0,
-- 	PRIMARY KEY(department_id)
-- );

-- INSERT INTO departments(department_name, over_head_costs, product_sales, total_profit)
-- VALUES 
-- ("Education", 10000000.00, 0, 0),
-- ("Electronics", 20000.00, 0, 0),
-- ("Imagination", 100000000.00, 0, 0);


-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Science Tricorder (Mark1)", "Electronics", 299000.00, 16),
-- ("Science Tricorder (Mark2", "Electronics", 299000.00, 12),
-- ("Science Vaporwear (Spock Edition)", "Electronics", 399000.00, 18),
-- ("Food Replicator", "Imagination", 479000.00, 12),
-- ("Universal Translator (71 Terestial Languages)", "Imagination", 299.95, 79),
-- ("Light Saber Model 3252J (Red)", "Imagination", 4000.00, 12),
-- ("Light Saber Model 3252J (Green)", "Imagination", 4599.00, 12),
-- ("Light Saber Model 3252J (Blue)", "Imagination", 4399.00, 12),
-- ("Raptor Dinosaur Egg", "Imagination", 100000, 13),
-- ("Matter Teleporter","Imagination", 1700000000.00, 18);


/* SELECT * FROM products ORDER BY price ASC; ## Low price to high price */
/* SELECT * FROM products ORDER BY price DESC; ## High price to low price */
SELECT * FROM products WHERE department_name = "Imagination"; ## Find item by specific department
/* SELECT product_name, price, stock_quantity FROM products WHERE item_id = 7; ## Find specific item by item ID number*/
/* SELECT product_name, price, stock_quantity FROM products WHERE item_id = $("itemId"); ## Find specific item by item ID variable */

-- UPDATE `bamazon`.`products` SET `product_name` = 'Elder Magic Wand', `department_name` = 'Imagination', `price` = '400000.00' WHERE (`item_id` = '9');
-- UPDATE `bamazon`.`products` SET `price` = '400000.00' WHERE (`item_id` = '6');
-- UPDATE `bamazon`.`products` SET `price` = '430000.00' WHERE (`item_id` = '8');
-- UPDATE `bamazon`.`products` SET `price` = '450000.00' WHERE (`item_id` = '7');







