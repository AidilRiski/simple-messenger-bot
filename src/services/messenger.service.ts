import axios from 'axios';
import MessageState from '../models/messageState';
import MessengerMessage from '../models/payloads/messengerMessage';
import { getUserState, setUserBirthDate, setUserName, setUserState } from './userState.service';

const getMessageResponse = (userID :string, message :string) => {
    const userState = getUserState(userID);
    switch (userState.messageState) {
        case MessageState.INITIAL:
            setUserState(userID, MessageState.NAME_ASKED);
            return new MessengerMessage('Hi! What is your name?');
        case MessageState.NAME_ASKED:
            setUserState(userID, MessageState.BIRTHDAY_ASKED);
            return new MessengerMessage(getNameResponse(userID, message));
        case MessageState.BIRTHDAY_ASKED:
            const birthdayResponse = getBirthdayResponse(userID, message);
            if (!birthdayResponse) return new MessengerMessage(`Please use 'YYYY-MM-DD' format for your birth date!`);
            setUserState(userID, MessageState.COUNTING_ASKED);
            return new MessengerMessage(birthdayResponse, getBinaryQuickReplies());
        case MessageState.COUNTING_ASKED:
            const countingResponse = getCountingResponse(userID, message);
            if (!countingResponse) return new MessengerMessage('I do not understand. Please answer with one of the provided choices.', getBinaryQuickReplies());
            setUserState(userID, MessageState.INITIAL);
            return new MessengerMessage(countingResponse);
        default:
            return new MessengerMessage('I do not understand.');
    }
};

const getNameResponse = (userID :string, name :string) => {
    setUserName(userID, name);
    return `Hello ${name}!😀 When is your birthday?`;
};

const getBirthdayResponse = (userID :string, message :string) => {
    const birthDate = Date.parse(message);
    if (isNaN(birthDate)) return undefined;
    setUserBirthDate(userID, new Date(birthDate));
    return 'Do you want to know how many days are left before your next birthday?';
};

const getCountingResponse = (userID :string, message :string) => {
    const binaryIntention = parseBinaryAnswer(message);
    if (binaryIntention === undefined) return undefined;
    if (!binaryIntention) return 'Alright, goodbye!👋';
    const birthDay = new Date(getUserState(userID).birthDate?.getTime() || 0);
    birthDay.setFullYear(new Date().getFullYear());
    if (new Date().getTime() > birthDay.getTime()) {
        birthDay.setFullYear(new Date().getFullYear() + 1);
    }
    const daysLeft = Math.ceil((birthDay.getTime() - new Date().getTime()) / (24 * 3600 * 1000));
    return `${daysLeft} day(s) left before your next birthday!`;
};

const getBinaryQuickReplies = () => {
    return [
        {
            content_type: 'text',
            title: 'Yes',
            payload: 'Yes',
        },
        {
            content_type: 'text',
            title: 'No',
            payload: 'No',
        },
    ];
};

const parseBinaryAnswer = (answer :string) => {
    const positiveAnswers = ['Yes', 'Yeah', 'Yup', 'Yea', 'Y'];
    const negativeAnswers = ['No', 'Nope', 'Nah', 'N'];
    const isPositive = positiveAnswers.find(
        (ans :string) => {
            return ans.toUpperCase() === answer.toUpperCase();
        },
    );
    if (isPositive) return true;
    const isNegative = negativeAnswers.find(
        (ans :string) => {
            return ans.toUpperCase() === answer.toUpperCase();
        },
    );
    if (isNegative) return false;
    return undefined;
};

const sendMessage = (psid :string, message :MessengerMessage) => {
    const requestBody = {
        recipient: {
            id: psid,
        },
        message: message,
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
