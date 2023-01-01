import {
    Schema,
} from 'express-validator'
import { schemaValidation } from "../../shared/config/schema.validation"

export const transactionValidation: Schema = Object.assign({}, schemaValidation, {
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
)