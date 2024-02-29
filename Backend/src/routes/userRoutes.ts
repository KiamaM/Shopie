import { Router } from "express"; 
import { deleteUserController, fetchAllUSersController, getSingleUserController, getUserDetails, loginUserControllers, registerUserController, resetPasswordControllers, updateUserControllers } from "../controllers/usersController";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router();

userRouter.post('/register', registerUserController)
userRouter.get('/all', fetchAllUSersController)
userRouter.get('/singleUser/:userID',verifyToken ,getSingleUserController)
userRouter.delete('/delete/:userID', deleteUserController)
userRouter.put('/update/:userID', updateUserControllers)
userRouter.post('/login', loginUserControllers)
userRouter.get('/userDetails', verifyToken , getUserDetails)
userRouter.post('/reset-password', resetPasswordControllers);


// userRouter.post('/initiate-password-reset', initiatePasswordResetController);

export default userRouter;