CREATE OR ALTER PROCEDURE updateUser(
    @userID VARCHAR (100),
    @firstName VARCHAR(200),
    @lastName VARCHAR(200),
    @email VARCHAR(250)
)
AS BEGIN
    UPDATE Users SET firstName=@firstName,lastName=@lastName,email=@email WHERE userID = @userID;

END
