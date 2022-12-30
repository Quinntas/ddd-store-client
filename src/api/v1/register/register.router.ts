import express from "express"
import type { Request, Response, NextFunction } from "express"
import HttpException from "../../../exception/http.exception";

export const registerRouter = express.Router();

registerRouter.post("/:type", async (request: Request, response: Response, next: NextFunction) => {
    const type = request.params.type
    if (!type)
        return next(new HttpException(400, 'please specify the registration type'))
    switch (type) {
        case 'client':
            return response.redirect('/api/v1/client')
        case 'shopkeeper':
            return response.redirect('/api/v1/shopkeeper')
        default:
            return next(new HttpException(404, 'not found'))
    }
})