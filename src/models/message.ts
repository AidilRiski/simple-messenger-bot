class Message {
    messageID :string
    senderID :string
    text :string
    deleted :boolean = false

    constructor(messageID :string, senderID :string, text :string) {
        this.messageID = messageID;
        this.senderID = senderID;
        this.text = text;
    }

    delete = () => {
        this.deleted = true;
        return true;
    }
}

export default Message;
