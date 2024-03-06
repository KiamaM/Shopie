CREATE OR ALTER PROCEDURE getOneProduct
    @productId VARCHAR(100)
AS
BEGIN
    IF (SELECT stockQuantity FROM products WHERE productId = @productId AND isDeleted = 0) < 1
    BEGIN
        DECLARE @ErrorMsg VARCHAR(100) = 'The product is currently out of stock';
        RAISERROR(@ErrorMsg, 16, 1);
        RETURN;
    END
    ELSE
    BEGIN
        SELECT * FROM products WHERE productId = @productId AND isDeleted = 0;
    END
END

