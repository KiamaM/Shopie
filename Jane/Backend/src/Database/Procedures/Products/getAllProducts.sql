CREATE OR ALTER PROCEDURE getAllProducts
AS
    IF NOT EXISTS (SELECT * FROM products WHERE isDeleted=0)
        BEGIN
            DECLARE @ErrorMsg VARCHAR(100) = 'You currently have no products to display'
            RAISERROR(@ErrorMsg, 16, 1);
            RETURN;
        END
    ELSE
        BEGIN
            (SELECT * FROM products WHERE isDeleted=0)
            RETURN;
        END