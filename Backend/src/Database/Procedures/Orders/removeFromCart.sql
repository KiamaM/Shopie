CREATE PROCEDURE cancelOrder(
    @orderId VARCHAR(100), 
    @userId VARCHAR(100), 
    @productId VARCHAR(100),
    @orderedQuantity NUMERIC
)
AS
BEGIN
    UPDATE orders SET 
    orderId = @orderId,
    productId = @productId,
    userId = @userId,
    orderedQuantity = @orderedQuantity
    WHERE orderId = @orderId
END