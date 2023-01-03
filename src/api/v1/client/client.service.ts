import { db } from "../../../utils/db.server";
import { clientCreateData, clientSelectData, clientUpdateData } from "./config/client.data";
import { Client, NewClient } from "../shared/types";

export const getClientInternalId = async (publicId: string): Promise<{ id: number } | null> => {
    return db.client.findUnique({
        where: {
            publicId
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

export const updateClient = async (newClient: NewClient, publicId: string): Promise<Client> => {
    return db.client.update({
        where: {
            publicId
        },
        data: clientUpdateData(newClient),
        select: clientSelectData,
    })
}

export const deleteClient = async (publicId: string): Promise<void> => {
    await db.client.delete({
        where: {
            publicId
        }
    })
    return
}