CREATE TABLE orders(
    orderId VARCHAR(100) NOT NULL PRIMARY KEY, 
    userId VARCHAR(100) NOT NULL, 
    productId VARCHAR(100) NOT NULL, 
    orderedQuantity NUMERIC,
    orderDate DATETIME NOT NULL, 
    isRemovedFromCart BIT DEFAULT 0,
    isOrdered BIT DEFAULT 0,
);

SELECT * FROM orders

ALTER TABLE orders
ADD CONSTRAINT FK_products_orders FOREIGN KEY (productId) REFERENCES products(productId);


ALTER TABLE orders
DROP COLUMN amount 