import { Router } from "express"; 
import { deleteUserController, fetchAllUSersController, getSingleUserController, getUserDetails, loginUserController, registerUserController, resetPasswordController, updateUserController } from "../Controllers/usersController";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router();

userRouter.post('/register', registerUserController)
userRouter.get('/all', fetchAllUSersController)
userRouter.get('/singleUser/:userID',verifyToken ,getSingleUserController)
userRouter.delete('/delete/:userID', deleteUserController)
userRouter.put('/update/:userID', updateUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/userDetails', verifyToken , getUserDetails)
userRouter.post('/reset-password', resetPasswordController);


// userRouter.post('/initiate-password-reset', initiatePasswordResetController);

export default userRouter;