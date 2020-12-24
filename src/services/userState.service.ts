import MessageState from '../models/messageState';
import UserState from '../models/userState';

interface UserStateMap {
    [key :string]: UserState
}

const userStates :UserStateMap = {};

const getUserState = (userID :string) => {
    let userState = userStates[userID] || new UserState(userID);
    userStates[userID] = (!userState.isExpired() && userState) || new UserState(userID);
    userState = userStates[userID];
    return userState;
};

const setUserName = (userID :string, name :string) => {
    userStates[userID].name = name;
    return true;
};

const setUserBirthDate = (userID :string, birthDate :Date) => {
    userStates[userID].birthDate = birthDate;
    return true;
};

const setUserState = (userID :string, messageState :MessageState) => {
    userStates[userID].messageState = messageState;
    return true;
};

export {
    getUserState,
    setUserName,
    setUserBirthDate,
    setUserState,
};
