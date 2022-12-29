import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/http.exception';

function errorMiddleware(exception: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = exception.status || 500;
    const error = {
        "message": exception.message,
        "details": exception.details
    } || { "error": 'Something went wrong' };
    response
        .status(status)
        .send({
            status,
            error,
        })
}

export default errorMiddleware;