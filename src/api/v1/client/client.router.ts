import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import * as ClientService from "./client.service"
import HttpException from "../../../exception/http.exception";
import { clientValidation } from "./config/client.validation";

export const clientRouter = express.Router();

clientRouter.get("/:publicId", async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const client = await ClientService.getClient(publicId)
        if (client)
            return response.status(200).json(client)
        next(new HttpException(404, 'client not found'))
    } catch (error: any) {
        next(new HttpException(404, 'a internal error has occured'))
    }
})

clientRouter.post("/", checkSchema(clientValidation), async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
})