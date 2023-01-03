import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import * as TransactionService from "./transaction.service"
import HttpException from "../../../exception/http.exception";
import { transactionValidation } from "./config.ts/transaction.validation";
import authenticateJWT from "../../../middleware/authenticateJWT.middleware";
import { prismaErrorHandler } from "../../../exception/prisma.exception";
import { Transaction } from "../shared/types";

export const transactionRouter = express.Router();

const checkTransactionOwner = async (transactionPublicId: string, authUserPublicId: string): Promise<boolean> => {
    try {
        return await TransactionService.checkTransactionIsFromPublicId(transactionPublicId, authUserPublicId)
    } catch (error: any) {
        return false
    }
}

transactionRouter.get("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const transaction = await TransactionService.getTransaction(publicId)
        if (!transaction)
            return next(new HttpException(404, 'transaction was not found'))
        if (transaction.client.user?.publicId !== request.publicId)
            return next(new HttpException(401, 'not authorized'))
        return response.status(200).json(transaction)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

transactionRouter.get("/list", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const isTransactionAuthorized = request.query.isTransactionAuthorized
        let transaction: Transaction[] | null = null
        if (isTransactionAuthorized && isTransactionAuthorized === 'true')
            transaction = await TransactionService.listTransactions(request.publicId)
        else
            transaction = await TransactionService.listUnauthorizedTransactions(request.publicId)
        if (!transaction)
            return next(new HttpException(404, 'no transaction was not found'))
        return response.status(200).json(transaction)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

transactionRouter.patch("/authorize/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const transaction = await TransactionService.authorizeTransaction(publicId, request.publicId)
        if (!transaction)
            return next(new HttpException(400, 'bad request'))
        return response.status(200).json(transaction)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

transactionRouter.post("/", authenticateJWT, checkSchema(transactionValidation), async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const transaction = await TransactionService.createTransaction(request.body, request.publicId)
        if (!transaction)
            return next(new HttpException(400, 'bad request'))
        return response.status(200).json(transaction)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

transactionRouter.put("/:publicId", authenticateJWT, checkSchema(transactionValidation), async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (!checkTransactionOwner(publicId, request.publicId))
        return next(new HttpException(401, 'not authorized'))
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const transaction = await TransactionService.updateTransaction(request.body, publicId, request.publicId)
        return response.status(200).json(transaction)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

transactionRouter.delete("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (!checkTransactionOwner(publicId, request.publicId))
        return next(new HttpException(401, 'not authorized'))
    try {
        await TransactionService.deleteTransaction(publicId)
        return response.status(200).json({ publicId: "was deleted successfully" })
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})