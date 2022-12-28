export type User = {
    publicId: string
    name: string,
    email: string,
    password: string
}

export type Wallet = {
    publicId: string,
    currentBalance: number
}

export type Client = {
    publicId: string,
    cpf: string,
    wallet: Wallet,
    user: User
}

export type Shopkeepers = {
    publicId: String,
    cnpj: String,
    wallet: Wallet,
    user: User
}