CREATE OR ALTER PROCEDURE createProduct(
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
INSERT INTO products(productId,productName, description, category, stockQuantity,regularPrice,salePrice, image)
VALUES(@productId,@productName, @description, @category, @stockQuantity,@regularPrice,@salePrice, @image)
END


