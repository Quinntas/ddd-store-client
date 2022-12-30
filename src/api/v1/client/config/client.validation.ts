import {
    Schema,
} from 'express-validator'
import { schemaValidation } from "../../shared/config/schema.validation"

export const clientValidation: Schema = Object.assign({}, schemaValidation, {
    cpf: {
        in: ['body'],
        errorMessage: "cpf is missing",
        isString: true,
        isLength: {
            options: { max: 11, min: 11 },
            errorMessage: 'cpf must be 11 charcters long'
        },
        matches: {
            options: [/^[0-9\s]+$/],
            errorMessage: 'cpf must contain only numbers'
        }
    },
}
)