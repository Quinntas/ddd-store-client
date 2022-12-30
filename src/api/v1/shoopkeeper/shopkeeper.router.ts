import express from "express"
import type { Request, Response, NextFunction } from "express"
import { checkSchema, validationResult } from "express-validator"
import { shopkeeperValidation } from "./config/shopkeeper.validation"
import * as ShopkeeperService from './shopkeeper.service'
import HttpException from "../../../exception/http.exception";
import { Prisma } from "@prisma/client";

export const shopkeeperRouter = express.Router();

shopkeeperRouter.get("/:publicId", async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        const shopkeeper = await ShopkeeperService.getShopkeeper(publicId)
        if (shopkeeper)
            return response.status(200).json(shopkeeper)
        return next(new HttpException(404, 'shopkeeper not found'))
    } catch (error: any) {
        return next(new HttpException(500, 'a internal error has occured'))
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
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2002':
                    return next(new HttpException(400, 'the following field already exist', error.meta))
            }
        return next(new HttpException(500, 'a internal error has occured'))
    }
})

shopkeeperRouter.put("/:publicId", checkSchema(shopkeeperValidation), async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    const publicId: string = request.params.publicId
    try {
        const shopkeeper = await ShopkeeperService.updateShopkeeper(request.body, publicId)
        return response.status(200).json(shopkeeper)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    return next(new HttpException(404, 'shopkeeper was not found'))
            }
        return next(new HttpException(500, 'a internal error has occured'))
    }
})

shopkeeperRouter.delete("/:publicId", async (request: Request, response: Response, next: NextFunction) => {
    const publicId: string = request.params.publicId
    try {
        await ShopkeeperService.delteShopkeeper(publicId)
        return response.status(200).json({ publicId: "was deleted successfully" })
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    return next(new HttpException(404, 'shopkeeper was not found'))
            }
        return next(new HttpException(500, 'a internal error has occured'))
    }
})