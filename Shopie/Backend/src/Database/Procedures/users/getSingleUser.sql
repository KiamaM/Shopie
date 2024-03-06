CREATE OR ALTER PROCEDURE getSingleUser(
    @userID	varchar(100)
)

AS
BEGIN
	SELECT	userID,email,firstName,lastName,role
	FROM Users WHERE userID= @userID
END

