const accountSid = 'AC57f70783ba079e8810174b1f19d7319e';
const authToken = '908ac6408c6eedad1640b5af2112e269';
const twilioNumber = '+447361582775';

// const client = require('twilio')(accountSid, authToken);

export const sendSMS = async (to, message) => {
    try {
        // const result = await client.messages.create({
        //     body: message,
        //     from: twilioNumber,
        //     to: to
        // });

        console.log(`Message sent with SID: ${to} + ${message}`);
    } catch (error) {
        console.error(`Error sending SMS: ${error.message}`);
    }
};