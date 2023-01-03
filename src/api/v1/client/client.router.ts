import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import * as ClientService from "./client.service"
import HttpException from "../../../exception/http.exception";
import { clientValidation } from "./config/client.validation";
import { Prisma } from "@prisma/client";
import authenticateJWT from "../../../middleware/authenticateJWT.middleware";
import { prismaErrorHandler } from "../../../exception/prisma.exception";

export const clientRouter = express.Router();

clientRouter.get("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const client = await ClientService.getClient(publicId)
        if (!client)
            return next(new HttpException(404, 'client not found'))
        else if (client.user.publicId !== request.publicId)
            return next(new HttpException(400, 'not authorized'))
        return response.status(200).json(client)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

clientRouter.post("/", checkSchema(clientValidation), async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const client = await ClientService.createClient(request.body)
        return response.status(200).json(client)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

clientRouter.put("/:publicId", authenticateJWT, checkSchema(clientValidation), async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const client = await ClientService.updateClient(request.body, publicId, request.publicId)
        if (!client)
            return next(new HttpException(400, 'not authorized'))
        return response.status(200).json(client)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

clientRouter.delete("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const result = await ClientService.deleteClient(publicId, request.publicId)
        if (!result)
            return next(new HttpException(400, 'not authorized'))
        return response.status(200).json({ publicId: "was deleted successfully" })
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})