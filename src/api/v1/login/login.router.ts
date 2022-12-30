import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import { Prisma } from "@prisma/client";
import * as LoginService from './login.service'
import HttpException from "../../../exception/http.exception";

import authenticateJWT from "../../../middleware/authenticateJWT.middleware";
export const loginRouter = express.Router();

loginRouter.get("/", async (request: Request, response: Response, next: NextFunction) => {
    const token = await LoginService.login(request.body.email, request.body.password)
    if (!token)
        return next(new HttpException(401, 'not authorized'))
    return response.status(200).json({ "access_token": token })
})