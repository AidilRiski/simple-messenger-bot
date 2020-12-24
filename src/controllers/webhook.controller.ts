import { Request, Response } from 'express';
import { addMessage } from '../services/message.service';
import { getMessageResponse, sendMessage } from '../services/messenger.service';

const get = (req :Request, res :Response) => {
    const mode = req.query['hub.mode'];
    const verifyToken = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (!mode || !verifyToken || !challenge) return res.status(400).send();

    if (verifyToken !== process.env.VERIFY_TOKEN) return res.status(403).send();

    return res.status(200).send(challenge);
};

const post = (req :Request, res :Response) => {
    const { body } = req;
    for (let i = 0; i < body.entry.length; i++) {
        const event  = body.entry[i].messaging[0];

        // If event is of message type.
        if (event.message) {
            const {
                sender: { id },
                timestamp,
                message: { mid, text },
            } = event;
            addMessage(mid, new Date(timestamp), id, text);
            const responseMessage = getMessageResponse(id, text);
            sendMessage(id, responseMessage);
        }
    }
    return res.status(200).send();
};

export {
    get,
    post,
};
