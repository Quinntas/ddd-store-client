import {
    Schema,
} from 'express-validator'

export const transactionValidation: Schema = {
    amount: {
        in: ['body'],
        errorMessage: "amount is missing",
        isInt: true,
    },
    clientPublicId: {
        in: ['body'],
        errorMessage: "clientPublicId is missing",
        isString: true,
    },
    shopkeeperPublicId: {
        in: ['body'],
        errorMessage: "shopkeeperPublicId is missing",
        isString: true,
    },
}
