CREATE OR ALTER PROCEDURE deleteUser(
    @userID VARCHAR(100)
)

AS
BEGIN
    DELETE  FROM Users WHERE userID=@userID

END