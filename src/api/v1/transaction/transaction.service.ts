import { db } from "../../../utils/db.server";
import { transactionSelectData, transactionCreateData, transactionUpdateData } from "./config.ts/transaction.data";
import { Transaction, NewTransaction } from "../shared/types";
import { getClientInternalId } from "../client/client.service";
import { getShopkeeperInternalId } from "../shoopkeeper/shopkeeper.service";

export const getTransaction = async (publicId: string): Promise<Transaction | null> => {
    return db.transaction.findUnique({
        where: {
            publicId
        },
        select: transactionSelectData
    })
}

export const listTransactions = async (publicId: string): Promise<Transaction[] | null> => {
    return db.transaction.findMany({
        where: {
            shopkeeper: {
                user: {
                    publicId: publicId
                }
            }, client: {
                user: {
                    publicId: publicId
                }
            }

        },
        select: transactionSelectData
    })
}

export const createTransaction = async (newTransaction: NewTransaction): Promise<Transaction | null> => {
    const client = await getClientInternalId(newTransaction.clientPublicID)
    const shoopkeeper = await getShopkeeperInternalId(newTransaction.shoopkeeperPublicId)
    if (!client || !shoopkeeper)
        return null
    return db.transaction.create({
        data: transactionCreateData(newTransaction, client.id, shoopkeeper.id),
        select: transactionSelectData
    })
}

export const updateTransaction = async (newTransaction: NewTransaction, publicId: string): Promise<Transaction | null> => {
    const client = await getClientInternalId(newTransaction.clientPublicID)
    const shoopkeeper = await getShopkeeperInternalId(newTransaction.shoopkeeperPublicId)
    if (!client || !shoopkeeper)
        return null
    return db.transaction.update({
        where: {
            publicId
        },
        data: transactionUpdateData(newTransaction, client.id, shoopkeeper.id),
        select: transactionSelectData,
    })
}

export const deleteTransaction = async (publicId: string): Promise<void> => {
    await db.transaction.delete({
        where: {
            publicId
        }
    })
    return
}