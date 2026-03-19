import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Your Twilio account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

const sendNotification = (phoneNumber, message) => {
  client.messages
    .create({
      body: message,  // The message to send
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,  // Your Twilio messaging service SID
      to: `+91${phoneNumber}`  // The phone number to send the message to
    })
    .then(message => console.log('Notification sent successfully:', message.sid))
    .catch(error => console.error('Error sending notification:', error));
};

export default sendNotification;
