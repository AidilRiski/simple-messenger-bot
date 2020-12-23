import { Request, Response } from 'express';
import { FAILED_DELETE_MESSAGE, FAILED_FETCH_NOT_FOUND_MESSAGE, SUCCESS_DELETE_MESSAGE, SUCCESS_FETCH_MESSAGE } from '../helpers/messages';
import { errorResponseBody, response, successResponseBody } from '../helpers/response';
import { deleteMessage, getMessage, getMessages } from '../services/message.service';

const get = (req :Request, res :Response) => {
    const { id } = req.params;
    const message = getMessage(id);
    if (!message) return response(res, errorResponseBody(
        FAILED_FETCH_NOT_FOUND_MESSAGE,
    ));
    return response(res, successResponseBody(
        SUCCESS_FETCH_MESSAGE,
        message,
    ));
};

const getAll = (req :Request, res :Response) => {
    const messages = getMessages();
    return response(res, successResponseBody(
        SUCCESS_FETCH_MESSAGE,
        messages,
    ));
};

const deleteById = (req :Request, res :Response) => {
    const { id } = req.params;
    const success = deleteMessage(id);
    if (!success) return response(res, errorResponseBody(
        FAILED_DELETE_MESSAGE,
    ));
    return response(res, successResponseBody(
        SUCCESS_DELETE_MESSAGE,
    ));
};

export {
    get,
    getAll,
    deleteById,
};
