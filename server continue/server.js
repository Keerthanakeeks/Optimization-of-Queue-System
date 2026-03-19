import express from "express"
import authController from "./controller/authController.js"
import 'dotenv/config'
import cors from 'cors';
import connectDB from "./config/dbconfig.js"
import userController from "./controller/userController.js";
import cronJob from './cronJob.js'; 


const app  = express();
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cors());
connectDB();


app.use("/auth",authController);
app.use("/api/user",userController);


app.listen(PORT,()=>{
    console.log(`Server listining to Port: ${PORT}`);
    cronJob();
    console.log(cronJob)
})