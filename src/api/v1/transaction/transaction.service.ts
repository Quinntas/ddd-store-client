import { db } from "../../../utils/db.server";
import { transactionSelectData, transactionCreateData, transactionUpdateData, authorizeTransactionSelectData } from "./config.ts/transaction.data";
import { Transaction, NewTransaction } from "../shared/types";
import { getClientInternalId } from "../client/client.service";
import { getShopkeeperInternalId } from "../shoopkeeper/shopkeeper.service";
import { findShopkeeperByUserId } from "../shared/user/user.service";
import { patchCurrentBalance } from "../shared/wallet/wallet.service";

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
            },
        },
        select: transactionSelectData
    })
}

export const listUnauthorizedTransactions = async (userPublicId: string): Promise<Transaction[] | null> => {
    const shoopkeeper = await findShopkeeperByUserId(userPublicId)
    if (!shoopkeeper)
        return null
    return db.transaction.findMany({
        where: {
            shopkeeper: {
                publicId: shoopkeeper.publicId
            },
            isAuthorized: false
        },
        select: transactionSelectData
    })
}

// Reduce line lenght and remake algo
export const authorizeTransaction = async (transactionPublicId: string, userPublicId: string): Promise<Transaction | null> => {
    const shoopkeeper = await findShopkeeperByUserId(userPublicId)
    // Get a reference of the old transaction
    const transaction = await db.transaction.findUnique({
        where: {
            publicId: transactionPublicId
        },
        select: authorizeTransactionSelectData
    })

    // Chek if everything is acording to the algo 
    if (!shoopkeeper || !transaction || transaction?.shopkeeper.publicId !== shoopkeeper.publicId || transaction.isAuthorized)
        return null
    // check if client has money
    if (transaction.client.wallet?.currentBalance - transaction.amount < 0)
        return null

    // Remove money from client
    await patchCurrentBalance(transaction.client.wallet?.publicId, transaction.client.wallet?.currentBalance - transaction.amount)

    // Add money to shopkeeper
    await patchCurrentBalance(transaction.shopkeeper.wallet?.publicId, transaction.shopkeeper.wallet?.currentBalance + transaction.amount)

    // Update the transaction
    const updatedTransaction = await db.transaction.update({
        where: {
            publicId: transaction?.publicId,
        },
        data: {
            isAuthorized: true
        },
        select: transactionSelectData
    })

    return updatedTransaction
}

export const createTransaction = async (newTransaction: NewTransaction): Promise<Transaction | null> => {
    const client = await getClientInternalId(newTransaction.clientPublicId)
    const shoopkeeper = await getShopkeeperInternalId(newTransaction.shopkeeperPublicId)
    if (!client || !shoopkeeper)
        return null
    return db.transaction.create({
        data: transactionCreateData(newTransaction, client.id, shoopkeeper.id),
        select: transactionSelectData
    })
}

export const checkTransactionIsFromPublicId = async (transactionPublicId: string, publicId: string): Promise<boolean> => {
    return transactionPublicId in listTransactions(publicId)
}

export const updateTransaction = async (newTransaction: NewTransaction, publicId: string): Promise<Transaction | null> => {
    const client = await getClientInternalId(newTransaction.clientPublicId)
    const shoopkeeper = await getShopkeeperInternalId(newTransaction.shopkeeperPublicId)
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