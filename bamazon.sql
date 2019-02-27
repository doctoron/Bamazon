DROP DATABASE IF EXISTS bamazon;
/* CREATE DATABASE bamazon; */

USE bamazon;

/*
CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(19,2) NOT NULL DEFAULT 0,
  stock_quantity INT NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);


CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs FLOAT(8) NOT NULL,
	product_sales FLOAT(8) DEFAULT 0,
	product_cost FLOAT(8) DEFAULT 0,
	total_profit FLOAT(8) DEFAULT 0,
	PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs, product_sales, total_profit)
VALUES ("Musical Instruments", 0, 0, 0),
("Electronics", 0, 0, 0),
("Telescopes", 0, 0, 0),
("Imagination Department", 0, 0, 0);

*/

/*
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JBL Waterproof Bluetooth Speaker (Black)", "Electronics", 99.00, 16),
("Hofner IGNITIONSB Electric Violin Bass Guitar-Rosewood Fingerboard (Sunburst Finish)", "Musical Instruments", 299.28, 12),
("Epiphone Les Paul Special VE Solid-Body Electric Guitar (Walnut)", "Musical Instruments", 203.97, 8),
("Pearl RS525SCC70C Roadshow 5-Piece Drum Set (Charcoal Metallic)", "Musical Instruments", 479.00, 12),
("Zildjian L80 Low Volume 14/16/18 Cymbal Set", "Musical Instruments", 299.95, 9),
("Light Saber Model 3252J (Red)", "Imagination Department", 4000.00, 2),
("Light Saber Model 3252J (Green)", "Imagination Department", 4599.00, 1),
("Light Saber Model 3252J (Blue)", "Imagination Department", 4399.00, 1),
("Raptor Dinosaur Egg", "Imagination Department", 100000, 3),
("Michael Jordan #23 Jersey", "Collectibles", 7500, 1),
("Celestron PowerSeeker 127EQ Telescope","Telescopes", 170.00, 78);
*/

/* SELECT * FROM products ORDER BY price ASC; ## Low price to high price */
/* SELECT * FROM products ORDER BY price DESC; ## High price to low price */
SELECT * FROM products WHERE department_name = LIKE "Imagination Department"; ## Find item by specific department
/* SELECT product_name, price, stock_quantity FROM products WHERE item_id = 7; ## Find specific item by item ID number*/
/* SELECT product_name, price, stock_quantity FROM products WHERE item_id = $("itemId"); ## Find specific item by item ID variable */









