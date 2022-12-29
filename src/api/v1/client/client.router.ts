import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import * as ClientService from "./client.service"
import HttpException from "../../../exception/http.exception";
import { clientValidation } from "./config/client.validation";
import { Prisma } from "@prisma/client";

export const clientRouter = express.Router();

clientRouter.get("/:publicId", async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const client = await ClientService.getClient(publicId)
        if (client)
            return response.status(200).json(client)
        next(new HttpException(404, 'client not found'))
    } catch (error: any) {
        next(new HttpException(500, 'a internal error has occured'))
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
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2002':
                    next(new HttpException(400, 'the following fields already exists', error.meta))
            }
        next(new HttpException(500, 'a internal error has occured'))
    }
})

clientRouter.put("/:publicId", checkSchema(clientValidation), async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    const publicId: string = request.params.publicId
    try {
        const client = await ClientService.updateClient(request.body, publicId)
        return response.status(200).json(client)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    next(new HttpException(404, 'the following client was not found'))
            }
        next(new HttpException(500, 'a internal error has occured'))
    }
})

clientRouter.delete("/:publicId", async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        await ClientService.deleteClient(publicId)
        return response.status(200).json({ publicId: "was deleted successfully" })
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    next(new HttpException(404, 'the following client was not found'))
            }
        next(new HttpException(500, 'a internal error has occured'))
    }
})