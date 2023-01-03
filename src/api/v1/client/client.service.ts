import { db } from "../../../utils/db.server";
import { clientCreateData, clientSelectData, clientUpdateData } from "./config/client.data";
import { Client, NewClient } from "../shared/types";

export const getClientInternalId = async (publicId: string): Promise<{ id: number } | null> => {
    return db.client.findUnique({
        where: {
            publicId: publicId
        },
        select: {
            id: true
        }
    })
}

export const getClient = async (publicId: string): Promise<Client | null> => {
    return db.client.findUnique({
        where: {
            publicId
        },
        select: clientSelectData
    })
}

export const createClient = async (newClient: NewClient): Promise<Client> => {
    return db.client.create({
        data: clientCreateData(newClient),
        select: clientSelectData
    })
}

export const updateClient = async (newClient: NewClient, publicId: string, authUserPublicId: string): Promise<Client | null> => {
    const client = await db.client.update({
        where: {
            publicId
        },
        data: clientUpdateData(newClient),
        select: clientSelectData,
    })
    if (client.user.publicId !== authUserPublicId)
        return null
    return client
}

export const deleteClient = async (publicId: string, authUserPublicId: string): Promise<boolean> => {
    const client = await getClient(publicId)
    if (!client || client?.user.publicId != authUserPublicId)
        return false
    await db.client.delete({
        where: {
            publicId
        }
    })
    return true
}