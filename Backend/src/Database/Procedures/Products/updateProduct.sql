CREATE OR ALTER PROCEDURE updateProduct(
    @productId VARCHAR(100),
    @productName VARCHAR(100),
    @description VARCHAR(400),
    @category VARCHAR(100),
    @stockQuantity NUMERIC,
    @regularPrice NUMERIC,
    @salePrice NUMERIC,
    @image VARCHAR(200)
)
AS
BEGIN
    IF NOT EXISTS(SELECT stockQuantity FROM products WHERE productId = @productId AND isDeleted=0) 
    BEGIN
        DECLARE @ErrorMsg VARCHAR(100) = 'The product is currently out of stock';
        RAISERROR(@ErrorMsg, 16, 1);
        RETURN;
    END

    ELSE
        BEGIN
            UPDATE products SET 
            productId = @productId,
            productName = @productName,
            description = @description,
            category = @category,
            stockQuantity = @stockQuantity,
            regularPrice = @regularPrice,
            salePrice = @salePrice,
            image = @image 
            WHERE productId = @productId
        END
END