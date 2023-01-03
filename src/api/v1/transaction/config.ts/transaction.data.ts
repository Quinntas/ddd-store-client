import { NewTransaction } from "../../shared/types"

// How data will be returned to end user
export const transactionSelectData = {
    publicId: true,
    isAuthorized: true,
    amount: true,
    client: {
        select: {
            publicId: true,
            cpf: true,
            user: {
                select: {
                    publicId: true,
                    email: true,
                    name: true
                }
            }
        }
    },
    shopkeeper: {
        select: {
            publicId: true,
            cnpj: true,
            user: {
                select: {
                    publicId: true,
                    email: true,
                    name: true
                }
            }
        }
    }
}

// How data will be updated
export const transactionUpdateData = (newTransaction: NewTransaction, clientId: number, shopkeeperId: number) => {
    return {
        isAuthorized: newTransaction.isAuthorized,
        amount: newTransaction.amount,
        clientId: clientId,
        shopkeeperId: shopkeeperId
    }
}

export const transactionCreateData = (newTransaction: NewTransaction, clientId: number, shopkeeperId: number) => {
    return {
        isAuthorized: false,
        amount: newTransaction.amount,
        clientId: clientId,
        shopkeeperId: shopkeeperId
    }
}