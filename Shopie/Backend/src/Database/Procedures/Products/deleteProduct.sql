CREATE OR ALTER PROCEDURE deleteProduct(@productId VARCHAR(100))
AS
BEGIN
    UPDATE products SET isDeleted = 1 WHERE productId = @productId    
END