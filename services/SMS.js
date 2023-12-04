import { Buffer } from 'buffer';

const accountSid = 'AC57f70783ba079e8810174b1f19d7319e';
const authToken = '908ac6408c6eedad1640b5af2112e269';
const twilioNumber = '+447361582775';

export const sendSMS = async (to, message) => {
    try {
        const body = `Body=${encodeURIComponent(message)}&From=${encodeURIComponent(twilioNumber)}&To=${encodeURIComponent(to)}`;

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${ Buffer.from(accountSid + ':' + authToken).toString('base64') }`
            },
            body
        });

        if (!response.ok) {
            const msg = await response.json();
            throw new Error(msg.message);
        }

        console.log(`SMS sent with SID: ${to} + ${message}`);
    } catch (error) {
        console.error(`Error sending SMS: ${error.message}`);
    }
};
