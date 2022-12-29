import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import * as ClientService from "./client.service"

export const clientRouter = express.Router();

clientRouter.get("/:publicId", async (request: Request, response: Response) => {
    const publicId: string = request.params.publicId
    try {
        const client = await ClientService.getClient(publicId)
        if (client)
            return response.status(200).json(client)
        return response.status(404).json({})
    } catch (error: any) {
        response.status(500).json(error.message)
    }
})