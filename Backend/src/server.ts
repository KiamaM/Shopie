import express from 'express'


const app = express();
app.use(express.json());


let port:number = 5000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})

