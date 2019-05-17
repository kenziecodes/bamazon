-- done 1. Create a MySQL Database called `bamazon`.

-- done 2. Then create a Table inside of that database called `products`.

-- 3. The products table should have each of the following columns:

--   done * item_id (unique id for each product)

--   done * product_name (Name of product)

--   done * department_name (Name of department)

--   done * price (cost to customer)

--   done * stock_quantity (how much of the product is available in stores)

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
id INTEGER NOT NULL AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50)NOT NULL,
department_name VARCHAR(50)NOT NULL,
price DECIMAL(10,2)NOT NULL,
stock_quantity INTEGER,
PRIMARY KEY(id)
);

