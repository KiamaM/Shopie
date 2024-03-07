CREATE OR ALTER PROCEDURE addToCart
    @orderId VARCHAR(100), 
    @userId VARCHAR(100), 
    @productId VARCHAR(100),
    @orderedQuantity NUMERIC
AS
    IF (SELECT stockQuantity FROM products WHERE productId = @productId) < 1
    BEGIN
        DECLARE @ErrorRaised VARCHAR(100) = 'The product is currently out of stock';
        RAISERROR(@ErrorRaised, 16, 1);
        RETURN;
    END
    ELSE
     SELECT * FROM products WHERE productId=@productId
        BEGIN

            -- Insert a new record into bookings table
            INSERT INTO orders(orderId,userId, productId, orderDate,orderedQuantity, isRemovedFromCart, isOrdered)
            VALUES (@orderId,@userId, @productId, GETDATE(),@orderedQuantity, 0, 1); -- booking_date defaults to current date and is_canceled defaults to 0  

        END
