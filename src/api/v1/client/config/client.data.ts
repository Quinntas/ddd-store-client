import { NewClient } from "../../shared/types"
import { selectData } from "../../shared/config/shared.data"

// How data will be returned to end user
export const clientSelectData = Object.assign({}, selectData, { cpf: true })

// How data will be updated/created
// Tem que ser separado do shared/config/shared.data.ts pois pode haver atributos do cliente que nao tem no shopkeeper e vise versa 
export const updateData = (newClient: NewClient) => {
    return {
        cpf: newClient.cpf,
        user: {
            create: {
                name: newClient.user.name,
                email: newClient.user.email,
                password: newClient.user.password
            }
        },
        wallet: {
            create: {
                currentBalance: newClient.wallet.currentBalance
            }
        }
    }
}