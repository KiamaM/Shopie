import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 }  from 'uuid'
import { Request, Response } from 'express'
import { registerUserController, loginUserControllers, updateUserControllers, fetchAllUSersController, getSingleUserController, deleteUserController } from './usersController'

      // REGISTRATION TESTING FUNCTIONALITY

 describe("User Registration", () => {
    let res: any;
    // let req: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it("successfully registers a user", async () => {
        const req = {
            body: {
                firstName: "Jane",
                lastName: "Ngene",
                email: "janengene@gmail.com",
                password: "12345678@Mo",
            }
        };

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("12345678@Mo" as never);

        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

        await registerUserController(req as Request, res as any);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({message: 'User Registered Successfully'})
    expect(res.status).toHaveBeenCalledWith(201)
    // expect(mockedInput).toHaveBeenCalledWith('firstName',  mssql.VarChar, 'Jane')
    // expect(mockedInput).toHaveBeenCalledWith('lastName',  mssql.VarChar, 'Ngene')
    // expect(mockedInput).toHaveBeenCalledWith('email',  mssql.VarChar, 'janengene@gmail.com')
    // expect(mockedInput).toHaveBeenCalledWith('password',  mssql.VarChar, '12345678@Mo')

    })
 })

   // LOGIN TESTING FUNCTIONALITY

describe("User login", () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('Returns an error if email or password is empty', async () => {
        const req = {
            body: {
                email: "",
                password: ""
            }
        };

        await loginUserControllers(req as Request, res);

        // expect(res.json).toHaveBeenCalledWith({  "error": "Email not found" });
    });

    it('Returns an error if email or password is missing', async () => {
        const req = {
            body: {
                
            }
        };

        await loginUserControllers(req as Request, res);

        // expect(res.json).toHaveBeenCalledWith({  "error": "\"email\" is required" });
    });

    it("Returns an error if email is not in the database", async () => {
        const req = {
            body: {
                email: "janengene@gmail.com",
                password: "12345678@Mo"
            }
        };

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [] })
        } as never);

        await loginUserControllers(req as Request, res);

        expect(res.json).toHaveBeenCalledWith({ error: "Email not found" });
    });

    it("Handles incorrect password scenario", async () => {
        const req = {
            body: {
                email: "janengene@gmail.com",
                password: "12345678@Mo"
            }
        };

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{
                    email: "janengene@gmail.com",
                    password: 'hashedPwd'
                }]
            })
        } as never);

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

        await loginUserControllers(req as Request, res);

        expect(res.json).toHaveBeenCalledWith({ error: "Incorrect Password" });
    });

    it("successfully logs in a user and returns a token", async () => {

        let expectedUser = {
            userID: "bd86c6b1-bbe1-469b-8e85-005c90c9bb40",
            firstName: "Jane",
            lastName: "Ngene",
            email: "janengene@gmail.com",
            password: "$2b$05$yjF7t5M8hOAfJv8JePjBOuAQs5XTMin/6MbxYEFKOOjAOEq0Z6CWy",
            role: "customer",
            welcomed: false,
            isSend: false,
        };

        const req = {
            body: {
                email: expectedUser.email,
                password: "12345678@Mo"
            }
        };

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] })
        } as never);

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

        jest.spyOn(jwt, 'sign').mockReturnValueOnce("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJiZDg2YzZiMS1iYmUxLTQ2OWItOGU4NS0wMDVjOTBjOWJiNDAiLCJmdWxsTmFtZSI6Ik1pbGRyZWQgT2NoaWVuZyIsImVtYWlsIjoibWlsZHJlZDJAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwicmVzZXRUb2tlbiI6bnVsbCwiZXhwaXJ5VGltZSI6bnVsbCwid2VsY29tZWQiOmZhbHNlLCJpc1NlbmQiOmZhbHNlLCJwcm9maWxlSW1hZ2UiOiJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNzAwMzIxMTE2OS0wYTFkZDcyMjhmMmQ_cT04MCZ3PTEzNzQmYXV0bz1mb3JtYXQmZml0PWNyb3AmaXhsaWI9cmItNC4wLjMmaXhpZD1NM3d4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OGZBJTNEJTNEIiwiaWF0IjoxNzAxMzQyOTk1LCJleHAiOjE3MDE1MTU3OTV9.ZXdADA07gCuZKejS2shDcz0Adzx7qrJT1bSjAznTrEU" as never);

        await loginUserControllers(req as Request, res);

        expect(res.json).toHaveBeenCalledWith({
            message: "User Logged in successfully",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJiZDg2YzZiMS1iYmUxLTQ2OWItOGU4NS0wMDVjOTBjOWJiNDAiLCJmdWxsTmFtZSI6Ik1pbGRyZWQgT2NoaWVuZyIsImVtYWlsIjoibWlsZHJlZDJAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwicmVzZXRUb2tlbiI6bnVsbCwiZXhwaXJ5VGltZSI6bnVsbCwid2VsY29tZWQiOmZhbHNlLCJpc1NlbmQiOmZhbHNlLCJwcm9maWxlSW1hZ2UiOiJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNzAwMzIxMTE2OS0wYTFkZDcyMjhmMmQ_cT04MCZ3PTEzNzQmYXV0bz1mb3JtYXQmZml0PWNyb3AmaXhsaWI9cmItNC4wLjMmaXhpZD1NM3d4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OGZBJTNEJTNEIiwiaWF0IjoxNzAxMzQyOTk1LCJleHAiOjE3MDE1MTU3OTV9.ZXdADA07gCuZKejS2shDcz0Adzx7qrJT1bSjAznTrEU"
        });
    });
});

   // USERS UPDATES AND DETAILS / DELETE / FETCH SINGLE USER/ etc 
describe("User Update and Details", () => {
    let res: any;
  
    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
    });
  
    it("Updates user details", async () => {
      const req = {
        params: {
          userID: "bd86c6b1-bbe1-469b-8e85-005c90c9bb40"
        },
        body: {
          firstName: "Jane",
          lastName: "Ngene",
          email: "janengene@gmail.com",
        }
      };
  
    
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
  
      const mockedRequest = {
        input: jest.fn().mockReturnThis(),
        execute: mockedExecute
      };
  
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest)
      };
  
      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);
  
      await updateUserControllers(req as any, res as any);
  
      expect(res.json).toHaveBeenCalledWith({ message: "User updated successfully" });
    });
   
  
    it("Gets all users", async () => {
      const req = {};
  
      const mockedUsers = [
        {
          userID: "a20f48e3-b8c1-4446-827d-d16e2e317971",
          firstName: "Jane",
          lastName: "Ngene",
          email: "janengene@gmail.com",
          password: "$2b$05$Iz49oOkLiS8hLOnDC8VpCOyk8yFu2BYxYXhVDTGUjq4PLlC4.v.FC",
          role: "customer",
          welcomed: true,
          isSend: false,
        },
        {
          userID: "bd86c6b1-bbe1-469b-8e85-005c90c9bb40",
          firstName: "Jane",
          lastName: "Ngene",
          email: "janengene@gmail.com",
          password: "$2b$05$yjF7t5M8hOAfJv8JePjBOuAQs5XTMin/6MbxYEFKOOjAOEq0Z6CWy",
          role: "customer",
          welcomed: false,
          isSend: false,
        },
      ];
  
      jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ recordset: mockedUsers })
      } as never);
  
      await fetchAllUSersController(req as any, res as any);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockedUsers);
    });

  
    it("Gets single user", async () => {
      let req = {
        params: {
          userID: "bd86c6b1-bbe1-469b-8e85-005c90c9bb40"
        }
      };

      let mockedOneUser={
            userID: "bd86c6b1-bbe1-469b-8e85-005c90c9bb40",
            firstName: "Jane",
            lastName: "Ngene",
            email: "janengene@gmail.com",
          }
      
  
      jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ recordset: [mockedOneUser]})
      } as never);
  
      await getSingleUserController(req as any, res as any);
  
      // expect(res.json).toHaveBeenCalledWith([ mockedOneUser ]);
    });

    it("Deletes user", async () => {
      const req = {
        params: {
          userID: "bd86c6b1-bbe1-469b-8e85-005c90c9bb40"
        }
      };

      
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
  
      const mockedRequest = {
        input: jest.fn().mockReturnThis(),
        execute: mockedExecute
      };
  
      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest)
      };
  
      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);
  
      await deleteUserController(req as any, res as any);
  
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });
})















