CREATE TABLE orders(
    orderId VARCHAR(100) NOT NULL PRIMARY KEY, 
    userId VARCHAR(100) NOT NULL, 
    productId VARCHAR(100) NOT NULL, 
    orderedQuantity NUMERIC,
    orderDate DATETIME NOT NULL, 
    isRemovedFromCart BIT DEFAULT 0,
    isOrdered BIT DEFAULT 0,
);

DROP TABLE orders

SELECT * FROM orders

ALTER TABLE orders
ADD CONSTRAINT FK_products_orders FOREIGN KEY (productId) REFERENCES products(productId);

ALTER TABLE orders
ADD CONSTRAINT FK_users_orders FOREIGN KEY (userId) REFERENCES Users(userId);

ALTER TABLE orders
ADD CONSTRAINT uq_users_orders UNIQUE (userId)



ALTER TABLE orders
DROP CONSTRAINT FK_users_orders;


ALTER TABLE orders
DROP CONSTRAINT FK_products_orders;





ALTER TABLE orders 
DROP COLUMN amount 