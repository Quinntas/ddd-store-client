import { db } from "../../../utils/db.server";

import { Client } from "../../../types";

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