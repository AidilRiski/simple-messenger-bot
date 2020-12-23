import Message from '../models/message'

const inMemoryMessages :Message[] = [];

const addMessage = (messageID :string, senderID :string, text :string) => {
    return inMemoryMessages.push(new Message(messageID, senderID, text)) !== 0;
};

const getMessage = (messageID :string) => {
    return inMemoryMessages.find(
        (message :Message) => {
            return message.messageID === messageID && !message.deleted;
        },
    );
};

const getMessages = () => {
    return inMemoryMessages.filter(
        (message :Message) => {
            return !message.deleted;
        },
    );
};

const deleteMessage = (messageID :string) => {
    return inMemoryMessages.find(
        (message :Message) => {
            return message.messageID === messageID && !message.deleted;
        },
    )?.delete();
};

export {
    addMessage,
    getMessage,
    getMessages,
    deleteMessage,
};
