class MessengerMessage {
    text :string
    quick_replies? :object
    
    constructor(text :string, quickReplies? :object) {
        this.text = text;
        this.quick_replies = quickReplies;
    }
}

export default MessengerMessage;
