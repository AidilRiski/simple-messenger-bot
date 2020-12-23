import axios from 'axios';

const getMessageResponse = (message :string) => {
    return message;
};

const sendMessage = (psid :string, message :string) => {
    const requestBody = {
        recipient: {
            id: psid,
        },
        message: {
            text: message,
        },
    };
    const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
    const endpoint = 'https://graph.facebook.com/v2.6/me/messages';
    const url = `${endpoint}?access_token=${pageAccessToken}`;
    axios.post(url, requestBody).then(
        res => { console.log('Message sent successfully!'); },
        err => {
            const { response: { data: { error } } } = err;
            console.log(error);
        },
    );
};

export {
    getMessageResponse,
    sendMessage,
};
