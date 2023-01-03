import { db } from "../../../utils/db.server";
import { shopkeeperSelectData, shopkeeperCreateData, shopkeeperUpdateData } from "./config/shopkeeper.data";
import { Shopkeeper, NewShopkeeper } from "../shared/types";

export const getShopkeeperInternalId = async (publicId: string): Promise<{ id: number } | null> => {
    return db.shopkeeper.findUnique({
        where: {
            publicId: publicId
        },
        select: {
            id: true
        }
    })
}

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

export const updateShopkeeper = async (newShopkeeper: NewShopkeeper, publicId: string, authUserPublicId: string): Promise<Shopkeeper | null> => {
    const shopkeeper = await db.shopkeeper.update({
        where: {
            publicId
        },
        data: shopkeeperUpdateData(newShopkeeper),
        select: shopkeeperSelectData,
    })
    if (shopkeeper.user.publicId !== authUserPublicId)
        return null
    return shopkeeper
}

export const delteShopkeeper = async (publicId: string, authUserPublicId: string): Promise<boolean> => {
    const shopkeeper = await getShopkeeper(publicId)
    if (!shopkeeper || shopkeeper.user.publicId !== authUserPublicId)
        return false
    await db.shopkeeper.delete({
        where: {
            publicId
        }
    })
    return true
}