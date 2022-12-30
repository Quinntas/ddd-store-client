import express from "express"
import type { Request, Response, NextFunction } from "express"
import * as LoginService from './login.service'
import HttpException from "../../../exception/http.exception";

export const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email
    const password = request.body.password
    const token = await LoginService.login(email, password)
    if (!token)
        return next(new HttpException(401, 'not authorized'))
    return response.status(200).json({ "access_token": token })
})