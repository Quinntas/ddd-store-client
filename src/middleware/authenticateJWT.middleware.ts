import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/http.exception';
const jwt = require("jsonwebtoken");

const JWT_TOKEN = process.env.JWT_TOKEN;

function authenticateJWT(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization
    if (!authHeader)
        return next(new HttpException(400, 'authorization is required'))
    const token = authHeader.split(' ')[1]
    try {
        const publicId = jwt.verify(token, JWT_TOKEN)
        request.publicId = publicId
        next()
    }
    catch (error: any) {
        return next(new HttpException(401, 'not authorized'))
    }
}

export default authenticateJWT;