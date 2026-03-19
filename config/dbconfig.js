import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
    })
    await mongoose.connect(`${process.env.MONGO_URI}/queue_optimization?retryWrites=true&w=majority&appName=Cluster0`);
}

export default connectDB;