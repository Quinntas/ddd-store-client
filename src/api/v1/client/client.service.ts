import { db } from "../../../utils/db.server";

import { Client } from "../../../types";

export const getClient = async (publicId: string): Promise<Client | null> => {
    return db.client.findUnique({
        where: {
            publicId
        },
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