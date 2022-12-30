import { User, Wallet } from "../types"
import { encryptValue } from "../../../../utils/encryption"

// How data will be returned to end user
export const selectData = {
    publicId: true,
    user: {
        select: {
            publicId: true,
            name: true,
            email: true,
            password: true,
        }
    },
    wallet: {
        select: {
            publicId: true,
            currentBalance: true
        }
    }
}

export const updateData = (user: Omit<User, "publicId">, wallet: Omit<Wallet, "publicId">) => {
    return {
        user: {
            create: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        },
        wallet: {
            create: {
                currentBalance: wallet.currentBalance
            }
        }
    }
}

export const createData = (user: Omit<User, "publicId">) => {
    return {
        user: {
            create: {
                name: user.name,
                email: user.email,
                password: encryptValue(user.password),
            }
        },
        wallet: {
            create: {
                currentBalance: 0
            }
        }
    }
}