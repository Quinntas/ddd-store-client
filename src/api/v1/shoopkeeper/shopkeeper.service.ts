import { db } from "../../../utils/db.server";
import { shopkeeperSelectData, shopkeeperCreateData, shopkeeperUpdateData } from "./config/shopkeeper.data";
import { Shopkeeper, NewShopkeeper } from "../shared/types";

export const getShopkeeper = async (publicId: string): Promise<Shopkeeper | null> => {
    return db.shopkeeper.findUnique({
        where: {
            publicId
        },
        select: shopkeeperSelectData
    })
}

export const createShopkeeper = async (newShopkeeper: NewShopkeeper): Promise<Shopkeeper> => {
    return db.shopkeeper.create({
        data: shopkeeperCreateData(newShopkeeper),
        select: shopkeeperSelectData
    })
}

export const updateShopkeeper = async (newShopkeeper: NewShopkeeper, publicId: string): Promise<Shopkeeper> => {
    return db.shopkeeper.update({
        where: {
            publicId
        },
        data: shopkeeperUpdateData(newShopkeeper),
        select: shopkeeperSelectData,
    })
}

export const delteShopkeeper = async (publicId: string): Promise<void> => {
    await db.shopkeeper.delete({
        where: {
            publicId
        }
    })
    return
}