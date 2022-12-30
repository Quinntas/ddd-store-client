import { NewShopkeeper } from "../../shared/types"
import { selectData } from "../../shared/config/shared.data"

// How data will be returned to end user
export const shopkeeperSelectData = Object.assign({}, selectData, { cnpj: true })

// How data will be updated/created
// Tem que ser separado do shared/config/shared.data.ts pois pode haver atributos do shopkeeper que nao tem no shopkeeper e vise versa 
export const updateData = (newShopkeeper: NewShopkeeper) => {
    return {
        cnpj: newShopkeeper.cnpj,
        user: {
            create: {
                name: newShopkeeper.user.name,
                email: newShopkeeper.user.email,
                password: newShopkeeper.user.password
            }
        },
        wallet: {
            create: {
                currentBalance: newShopkeeper.wallet.currentBalance
            }
        }
    }
}