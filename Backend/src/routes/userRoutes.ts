import { Router } from "express"; 
import { verifyToken } from "../Middlewares/verifyToken";
import { checkUserDetails, deleteUserController, fetchAllUSersController, getSingleUserController, getUserDetails, loginUserController, registerUserController, resetPasswordController, updateUserController } from "../Controllers/usersController";

const userRouter = Router();

userRouter.post('/register', registerUserController)
userRouter.get('/', fetchAllUSersController)
userRouter.get('/singleUser/:userID',verifyToken ,getSingleUserController)
userRouter.delete('/delete/:userID', deleteUserController)
userRouter.put('/update/:userID', updateUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/userDetails', verifyToken , getUserDetails)
userRouter.post('/reset-password',verifyToken, resetPasswordController);
userRouter.get('/checkdetails', verifyToken, checkUserDetails)


export default userRouter;