import { Request, Response } from 'express';
import { SUCCESS_FETCH_MESSAGE } from '../helpers/messages';
import { response, successResponseBody } from '../helpers/response'
import { helloWorld } from '../services/example/helloWorld';

const get = (req :Request, res :Response) => {
    return response(
        res,
        successResponseBody(
            SUCCESS_FETCH_MESSAGE,
            helloWorld(),
        ),
    );
};

export {
    get
};
