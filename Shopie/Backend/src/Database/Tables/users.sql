CREATE TABLE Users(
    userID VARCHAR(100) PRIMARY KEY,
    firstName VARCHAR(200) NOT NULL,
    lastName VARCHAR(200) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) DEFAULT 'customer',
    welcomed BIT Default 0,
)

select * from Users

UPDATE Users SET role='Admin' where email='meshackkorir@gmail.com' 

DROP TABLE Users