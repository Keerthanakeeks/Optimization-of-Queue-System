import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const router = express.Router();

//Token creation function 
const createToken = (id,email) =>{
    return jwt.sign({id,email},process.env.JWT_SECRET);
}

router.post("/register",async(req,res) =>{
    try {
        const{name,email,password,mobile} = req.body;
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name,
            email,
            mobile,
            password:hashPassword
        })
        await newUser.save();
        res.json({success:true, message:"Registration Successfull"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
})

 

router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch  = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createToken(user._id,user.email);
            res.json({success:true,token})
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}) 

router.post("/admin",async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(email,password)
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
})

export default router;