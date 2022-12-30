import { NewShopkeeper } from "../../shared/types"
import { selectData, updateData, createData } from "../../shared/config/shared.data"

// How data will be returned to end user
export const shopkeeperSelectData = Object.assign({}, selectData, { cnpj: true })

// How data will be updated/created
// Tem que ser separado do shared/config/shared.data.ts pois pode haver atributos do cliente que nao tem no shopkeeper e vise versa 
export const shopkeeperUpdateData = (newShopkeeper: NewShopkeeper) => {
    return Object.assign({}, updateData(newShopkeeper.user, newShopkeeper.wallet), { cnpj: newShopkeeper.cnpj })
}

export const shopkeeperCreateData = (newShopkeeper: NewShopkeeper) => {
    return Object.assign({}, createData(newShopkeeper.user), { cnpj: newShopkeeper.cnpj })
}