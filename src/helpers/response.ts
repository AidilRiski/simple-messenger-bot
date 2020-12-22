import { Response } from 'express';

class MetaBody {
    readonly message :string;
    readonly status :number;
    constructor(message :string, statusCode :number) {
        this.message = message;
        this.status = statusCode;
    }
}

class ResponseBody {
    readonly data? :object;
    readonly meta :MetaBody;

    constructor(message :string, data? :object, statusCode :number = 200) {
        this.data = data;
        this.meta = new MetaBody(message, statusCode);
    }
}

const errorResponseBody = (message :string, statusCode :number = 400) => {
    return new ResponseBody(message, undefined, statusCode);
};

const successResponseBody = (message :string, data? :object, statusCode :number = 200) => {
    return new ResponseBody(message, data, statusCode);
};

const response = (res :Response, body :ResponseBody) => {
    return res.status(body.meta.status).send(body);
};

export {
    errorResponseBody,
    successResponseBody,
    response,
};
