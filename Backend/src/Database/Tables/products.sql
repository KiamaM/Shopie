CREATE TABLE products(
    productId VARCHAR(100) PRIMARY KEY NOT NULL,
    description VARCHAR(400) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stockQuantity NUMERIC NOT NULL,
    regularPrice NUMERIC NOT NULL,
    salePrice NUMERIC NOT NULL,
    image VARCHAR(200) NOT NULL,    
)


ALTER TABLE products
ADD productName VARCHAR(100)

UPDATE products SET isDeleted = 0

ALTER TABLE products
ADD isOrdered BIT DEFAULT 0

UPDATE products SET isOrdered = 0


SELECT * FROM products