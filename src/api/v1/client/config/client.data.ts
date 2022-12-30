import { NewClient } from "../../shared/types"
import { selectData, updateData, createData } from "../../shared/config/shared.data"

// How data will be returned to end user
export const clientSelectData = Object.assign({}, selectData, { cpf: true })

// How data will be updated/created
// Tem que ser separado do shared/config/shared.data.ts pois pode haver atributos do cliente que nao tem no shopkeeper e vise versa 
export const clientUpdateData = (newClient: NewClient) => {
    return Object.assign({}, updateData(newClient.user, newClient.wallet), { cpf: newClient.cpf })
}

export const clientCreateData = (newClient: NewClient) => {
    return Object.assign({}, createData(newClient.user), { cpf: newClient.cpf })
}