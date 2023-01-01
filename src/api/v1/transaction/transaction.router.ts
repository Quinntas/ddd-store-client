import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import * as TransactionService from "./transaction.service"
import HttpException from "../../../exception/http.exception";
import { transactionValidation } from "./config.ts/transaction.validation";
import { Prisma } from "@prisma/client";
import authenticateJWT from "../../../middleware/authenticateJWT.middleware";

export const transactionRouter = express.Router();

transactionRouter.get("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const transaction = await TransactionService.getTransaction(publicId)
        if (transaction)
            if (transaction.client.user?.publicId !== request.publicId)
                return next(new HttpException(401, 'not authorized'))
            else
                return response.status(200).json(transaction)
        return next(new HttpException(404, 'transaction not found'))
    } catch (error: any) {
        return next(new HttpException(500, 'a internal error has occured'))
    }
})

transactionRouter.get("/list/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    try {
        const transaction = await TransactionService.listTransactions(publicId)
        if (transaction)
            return response.status(200).json(transaction)
        return next(new HttpException(404, 'transaction not found'))
    } catch (error: any) {
        return next(new HttpException(500, 'a internal error has occured'))
    }
})

transactionRouter.post("/:publicId", authenticateJWT, checkSchema(transactionValidation), async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const transaction = await TransactionService.createTransaction(request.body)
        return response.status(200).json(transaction)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2002':
                    return next(new HttpException(400, 'the following fields already exists', error.meta))
            }
        return next(new HttpException(500, 'a internal error has occured'))
    }
})

transactionRouter.put("/:publicId", authenticateJWT, checkSchema(transactionValidation), async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const transaction = await TransactionService.updateTransaction(request.body, publicId)
        return response.status(200).json(transaction)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    return next(new HttpException(404, 'the following transaction was not found'))
            }
        return next(new HttpException(500, 'a internal error has occured'))
    }
})

transactionRouter.delete("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    try {
        await TransactionService.deleteTransaction(publicId)
        return response.status(200).json({ publicId: "was deleted successfully" })
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    return next(new HttpException(404, 'the following transaction was not found'))
            }
        return next(new HttpException(500, 'a internal error has occured'))
    }
})