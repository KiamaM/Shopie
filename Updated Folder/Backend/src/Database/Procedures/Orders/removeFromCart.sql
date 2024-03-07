CREATE OR ALTER PROCEDURE removeFromCart(@orderId VARCHAR(100))
AS
BEGIN
    UPDATE orders SET isRemovedFromCart = 1 WHERE orderId = @orderId
END