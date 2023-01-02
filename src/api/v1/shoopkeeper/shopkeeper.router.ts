import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import { shopkeeperValidation } from "./config/shopkeeper.validation"
import * as ShopkeeperService from './shopkeeper.service'
import HttpException from "../../../exception/http.exception";
import authenticateJWT from "../../../middleware/authenticateJWT.middleware"
import { prismaErrorHandler } from "../../../exception/prisma.exception"

export const shopkeeperRouter = express.Router();

shopkeeperRouter.get("/:publicId", authenticateJWT, async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    try {
        const shopkeeper = await ShopkeeperService.getShopkeeper(publicId)
        if (shopkeeper)
            return response.status(200).json(shopkeeper)
        return next(new HttpException(404, 'shopkeeper not found'))
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

shopkeeperRouter.post("/", checkSchema(shopkeeperValidation), async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const shopkeeper = await ShopkeeperService.createShopkeeper(request.body)
        return response.status(200).json(shopkeeper)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

shopkeeperRouter.put("/:publicId", checkSchema(shopkeeperValidation), async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    try {
        const shopkeeper = await ShopkeeperService.updateShopkeeper(request.body, publicId)
        return response.status(200).json(shopkeeper)
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})

shopkeeperRouter.delete("/:publicId", async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    if (publicId !== request.publicId)
        return next(new HttpException(401, 'not authorized'))
    try {
        await ShopkeeperService.delteShopkeeper(publicId)
        return response.status(200).json({ publicId: "was deleted successfully" })
    } catch (error: any) {
        return prismaErrorHandler(error, next)
    }
})