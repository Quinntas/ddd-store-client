import { NewClient } from "../../../../types"

// How data will be returned to end user
export const selectData = {
    publicId: true,
    cpf: true,
    user: {
        select: {
            publicId: true,
            name: true,
            email: true,
            password: true
        }
    },
    wallet: {
        select: {
            publicId: true,
            currentBalance: true
        }
    }
}

// How data will be updated/created
export const updateData = (newClient: NewClient) => {
    return {
        cpf: newClient.cpf,
        user: {
            create: {
                name: newClient.user.name,
                email: newClient.user.email,
                password: newClient.user.password
            }
        },
        wallet: {
            create: {
                currentBalance: newClient.wallet.currentBalance
            }
        }
    }
}