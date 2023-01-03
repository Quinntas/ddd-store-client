import { Prisma } from "@prisma/client";
import type { NextFunction } from "express"
import HttpException from "./http.exception"

export const prismaErrorHandler = async (error: any, next: NextFunction) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
            case 'P2025':
                return next(new HttpException(404, 'the following item was not found'))
        }
    return next(new HttpException(500, 'a internal error has occured'))
}