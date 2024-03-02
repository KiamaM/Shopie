import { Request, Response } from "express"; 
import { sqlConfig } from "../config/sqlConfig"; 
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import Connection from "../dbHelpers/dbHelpers";
import { regUserValidation, validateUpdateuser, loginUserValidation} from "../Validators/validators"; 
import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import { ExtendeUser } from "../Middlewares/verifyToken";

const dbHelpers = new Connection

export const registerUserController = async (req: Request, res: Response) => {

    try {
        const { firstName, lastName, email, password} = req.body

        const { error } = regUserValidation.validate(req.body)
    if (error) {
      return res.status(404).json({
        message: "Check your username/password/email kindly",
        error: error.details

      })
    }


    const userID = v4()
    const hashedpwd = await bcrypt.hash(password, 5);
    const pool = await mssql.connect(sqlConfig)

    const results = pool.request()
      .input('userID', mssql.VarChar, userID)
      .input('firstName', mssql.VarChar, firstName)
      .input('lastName', mssql.VarChar, lastName)
      .input('email', mssql.VarChar, email)
      .input('password', mssql.VarChar, hashedpwd)
      .execute('registerUser')

      return res.status(201).json({
        message: 'User registered successfully'
      })
    } catch (error) {
        return res.status(404).json({
          error: error,
          message: "Server error"
        })
      }

}

export const loginUserControllers = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
  
      const { error } = loginUserValidation.validate(req.body)
  
      if (error) {
        return res.json({
          error: error.details
        })
      }
  
      const pool = await mssql.connect(sqlConfig);
      const user = await (await pool.request().input('email', mssql.VarChar, email).input('password', mssql.VarChar, password).execute('loginUser')).recordset
      console.log(user);
  
      if (user[0]?.email == email) {
        const correctPWD = await bcrypt.compare(password, user[0]?.password);
  
        if (!correctPWD) {
          return res.status(404).json({
            error: "Incorrect Password"
          })
        }
  
        const loginCredentials = user.map((records) => {
          const { password, ...rest } = records;
          return rest
        });
  
        const token = jwt.sign(loginCredentials[0], process.env.SECRET as string, {
          expiresIn: '1000h'
        })
  
        return res.status(201).json({
          message: 'User Logged in successfully',
          token
        })
      } else {
        return res.json({
          error: "Email not found"
        })
      }
    } catch (error) {
      return res.json({
        error: error
      })
    }
  }

export const fetchAllUSersController = async (req: Request, res: Response) => {
    try{

        const pool = await mssql.connect(sqlConfig);
        let users = (await pool.request().execute('getAllUsers')).recordset

        return res.status(201).json(users)

    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getSingleUserController = async (req: Request, res: Response) => {
    try {
      const userID = req.params.userID;
      console.log(userID);
      if (!userID) return res.status(403).send({ message: "Id is required" });
  
  
      const result = await dbHelpers.execute('getSingleUser', { userID });
  
      res.json(result.recordset);
  
    } catch (error) {
      return res.json(400).json({
        error: error
      })
    }
  };

export const deleteUserController = async (req: Request, res: Response) => {
    try {
      const { userID } = req.params
  
      const deleteUser = await dbHelpers.execute('deleteUser', { userID })

      if(deleteUser.rowsAffected[0]== 0){
        return res.json({
          message: 'User not found'
        })

      } else {
        return res.json({
          message: 'User deleted successfully'
        })
      }
      
    } catch (error) {
      return res.json({
        error: error
      })
    }
  }

  export const updateUserControllers = async (req: Request, res: Response) => {
    try {
  
      const { firstName, lastName, email} = req.body
      const { userID } = req.params
      const { error } = validateUpdateuser.validate(req.body);
      if (error)
        return res.status(403).json({ success: false, message: error.details[0].message });
  
      const pool = await mssql.connect(sqlConfig)
  
      const updateUsers = await pool.request()
      .input('userID', mssql.VarChar, userID)
      .input('firstName', mssql.VarChar,firstName)
      .input('lastName', mssql.VarChar,lastName)
      .input('email', mssql.VarChar, email)
      .execute('updateUser')
  
      return res.json({
        message: "User updated successfully"
      });
  
    } catch (error) {
      return res.json({
        error: error
      })
    }
  }

    
export const getUserDetails = async (req: ExtendeUser, res: Response) => {
  try {
    const user = req.info
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      })
    }

    const pool = await mssql.connect(sqlConfig);
    const userID = user.userID
    console.log(userID);

    const result = await dbHelpers.execute('GetUserDetails', { userID });

    const userDetails = result.recordset
    console.log(userDetails);
    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });

    }

    return res.status(200).json(userDetails);

  } catch (error) {
    return res.json({
      error: error
    })
  }
}

export const resetPasswordControllers = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    const test = req.body
    console.log(test);
    
    const hashedPwd = await bcrypt.hash(newPassword, 5);

    const result =(await dbHelpers.execute('resetPassword', {
      email,
      newPassword: hashedPwd,
    }));
    console.log('result here', result);

    if (result.returnValue < 1) {
      return res.json({
        message: 'User not found',
      });
    } else {
      return res.json({
        message: 'Password updated successfully',
      });
    }
  } catch (error) {
    return res.status(501).json({
      error: error,
    });
  }
};


