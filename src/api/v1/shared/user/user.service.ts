import { db } from "../../../../utils/db.server";

export const findShopkeeperByUserId = async (userPublicId: string) => {
    const shoopkeeper = await db.user.findUnique({
        where: {
            publicId: userPublicId
        },
        select: {
            Shopkeeper: true
        }
    })
    return shoopkeeper?.Shopkeeper || null
}