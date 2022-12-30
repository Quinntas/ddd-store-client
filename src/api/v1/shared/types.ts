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

export type NewClient = {
    cpf: string,
    user: Omit<User, "publicId">,
    wallet: Omit<Wallet, "publicId">,
}

export type Shopkeeper = {
    publicId: string,
    cnpj: string,
    wallet: Wallet,
    user: User
}

export type NewShopkeeper = {
    cnpj: string,
    user: Omit<User, "publicId">,
    wallet: Omit<Wallet, "publicId">,
}

export type Transaction = {
    publicId: string,
    isAuthorized: boolean,
    amount: number,
    client: Client,
    shopkeeper: Shopkeeper,
}

export type NewTransaction = {
    isAuthorized: boolean,
    amount: number,
    clientPublicId: number
    shopkeeperPublicId: number
}