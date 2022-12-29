import {
    Schema,
} from 'express-validator'

export const schemaValidation: Schema = {
    'user.name': {
        in: ['body'],
        errorMessage: "user.name is missing",
        isString: true,
        isLength: {
            options: { max: 50, min: 3 },
            errorMessage: 'user.name must at least 3 characters long and max 50 characters long'
        },
        matches: {
            options: [/^[A-Za-z\s]+$/],
            errorMessage: 'cpf must be alphabetic'
        }
    },
    "user.email": {
        errorMessage: "user.email is missing",
        isString: true,
        in: ['body'],
    },
    "user.password": {
        in: ['body'],
        errorMessage: "user.password is missing",
        isString: true,
        isLength: {
            options: { max: 6, },
            errorMessage: 'user.password must at least 6 characters'
        }
    },
    "wallet.currentBalance": {
        errorMessage: 'wallet.currentBalance is missing',
        isInt: true,
        toInt: true
    }
}