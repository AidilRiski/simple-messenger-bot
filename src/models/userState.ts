import MessageState from './messageState';

class UserState {
    userID :string
    messageState :MessageState = MessageState.INITIAL
    expiryTime :Date = new Date(new Date().getTime() + 10 * 60 * 1000)
    name? :string
    birthDate? :Date

    constructor(userID :string) {
        this.userID = userID;
    }

    isExpired = () => {
        return new Date() > this.expiryTime;
    }
}

export default UserState;
