class Message {
    messageID :string
    timestamp :Date
    senderID :string
    text :string
    deleted :boolean = false

    constructor(messageID :string, timestamp :Date, senderID :string, text :string) {
        this.messageID = messageID;
        this.timestamp = timestamp;
        this.senderID = senderID;
        this.text = text;
    }

    delete = () => {
        this.deleted = true;
        return true;
    }
}

export default Message;
