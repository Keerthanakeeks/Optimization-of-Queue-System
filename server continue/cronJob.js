import cron from "node-cron";
import userModel from "./models/userModel.js";
import sendNotification from "./middleware/sendNotification.js";




const checkAndNotifyUsers = async () => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const users = await userModel.find({ notifyDate: today });

        if (users.length > 0) {
            users.forEach(user => {
                // Send notification to each user
                console.log(user.mobile)
                sendNotification(user.mobile, 'Your scheduled notification has arrived!');
            });
        }
        else{
            console.log("No users found for today.");
        }
    } catch (error) {
        console.log('Error checking and sending notifications:', error);
    }
};


cron.schedule('0 0 * * *', checkAndNotifyUsers);
checkAndNotifyUsers();
export default checkAndNotifyUsers; 

