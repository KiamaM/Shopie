CREATE OR ALTER PROCEDURE deleteProduct(@productId VARCHAR(100))
AS
BEGIN
    UPDATE products SET isDeleted = 1 WHERE productId = @productId    
END

select * from products

UPDATE products SET isDeleted = 0 WHERE productId = '1d2e8de1-c707-405f-a0d3-bd235f11658b'