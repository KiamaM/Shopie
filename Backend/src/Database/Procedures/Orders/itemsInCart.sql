CREATE OR ALTER PROCEDURE getItemsInCart
    @userId VARCHAR(100)
AS
BEGIN 
SELECT * FROM orders o
INNER JOIN products p ON p.productId = b.productId
INNER JOIN users u ON u.userId = b.userId
WHERE b.userId = @userId
END