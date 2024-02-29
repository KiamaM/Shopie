import express, { json } from 'express'
import userRouter from './routes/userRoutes'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(json());

app.use(cors())


app.use('/users', userRouter)

let port:number = 5000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})


// function cors(): any {
//     throw new Error('Function not implemented.');
// }

