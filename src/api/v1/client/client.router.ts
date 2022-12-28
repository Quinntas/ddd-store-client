import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import * as ClientService from "./client.service"

export const clientRouter = express.Router();

clientRouter.get("/", async (request: Request, response: Response) => {
    try {
        const clients = await ClientService.listClients()
        return response.status(200).json(clients)
    } catch (error: any) {
        response.status(500).json(error.message)
    }
})