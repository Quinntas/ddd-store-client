import express from "express"
import type { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"
import * as ClientService from "./client.service"
import HttpException from "../../../exception/http.exception";

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