import { db } from "../../../utils/db.server";

type User = {
    publicId: string
    name: string,
    email: string,
    password: string
}

type Wallet = {
    publicId: string,
    currentBalance: number
}

type Client = {
    publicId: string,
    cpf: string,
    wallet: Wallet,
    user: User
}

export const listClients = async (): Promise<Client[]> => {
    return db.client.findMany({
        select: {
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
    })
}