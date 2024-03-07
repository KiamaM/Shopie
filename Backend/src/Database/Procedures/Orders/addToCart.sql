CREATE OR ALTER PROCEDURE addToCart
    @orderId VARCHAR(100), 
    @user_id VARCHAR(100), 
    @product_id VARCHAR(100),
    @orderedQuantity NUMERIC
AS
    IF (SELECT stockQuantity FROM products WHERE productId = @product_id) < 1
    BEGIN
        DECLARE @ErrorRaised VARCHAR(100) = 'The product is currently out of stock';
        RAISERROR(@ErrorRaised, 16, 1);
        RETURN;
    END
    ELSE
     SELECT * FROM products WHERE productId=@product_id
        BEGIN

            -- Insert a new record into bookings table
            INSERT INTO orders(orderId,userId, productId, orderDate,orderedQuantity, isRemovedFromCart, isOrdered)
            VALUES (@orderId,@user_id, @product_id, GETDATE(),@orderedQuantity, 0, 1); -- booking_date defaults to current date and is_canceled defaults to 0  

        END
SELECT * FROM orders