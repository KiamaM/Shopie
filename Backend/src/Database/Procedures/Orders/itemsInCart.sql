CREATE OR ALTER PROCEDURE getItemsInCart
    @userId VARCHAR(100)
AS
BEGIN 
    SELECT * FROM orders o
    INNER JOIN products p ON p.productId = o.productId
    INNER JOIN Users u ON u.userId = o.userId
    WHERE o.userId = @userId AND o.isOrdered = 1
END