import { db } from "../../../../utils/db.server";

export const patchCurrentBalance = async (walletPublicId: string | undefined, amount: number) => {
    if (!walletPublicId)
        return null
    return await db.wallet.update({
        where: {
            publicId: walletPublicId
        },
        data: {
            currentBalance: amount
        }
    })
}