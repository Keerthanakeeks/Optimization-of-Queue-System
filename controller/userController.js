import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import userModel from '../models/userModel.js';

const router = express.Router();


router.get("/get-users",async(req,res)=>{
        try {
            
            const users = await userModel.find({});
            res.json({success:true, users});
            
        } catch (error) {
            console.log(error.message);
            res.json({success:false,message:error.messgae});
        }
})

router.put("/update-date/:userId",async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.body;
     
  
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { notifyDate: date }, // Update the notificationDate field
        { new: true }
    );
    
    if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, updatedUser });
} catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
}
})






export default router;