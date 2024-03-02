CREATE OR ALTER PROCEDURE registerUser(
    @userID VARCHAR(100),
    @firstName VARCHAR(200),
    @lastName VARCHAR(200),
    @email VARCHAR(250),
    @password VARCHAR(100)
   
)

AS
BEGIN
     INSERT INTO Users(userID,firstName,lastName,email,password)
     VALUES(@userID,@firstName,@lastName,@email,@password)
END

DROP PROCEDURE registerUser;

