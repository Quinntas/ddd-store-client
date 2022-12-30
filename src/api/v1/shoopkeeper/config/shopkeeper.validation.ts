import {
    Schema,
} from 'express-validator'
import { schemaValidation } from "../../shared/config/schema.validation"

export const shopkeeperValidation: Schema = Object.assign({}, schemaValidation, {
    cnpj: {
        in: ['body'],
        errorMessage: "cnpj is missing",
        isString: true,
        isLength: {
            options: { max: 14, min: 14 },
            errorMessage: 'cnpj must be 14 charcters long'
        },
        matches: {
            options: [/^[0-9\s]+$/],
            errorMessage: 'cnpj must contain only numbers'
        }
    },
}
)