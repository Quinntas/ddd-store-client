import { db } from "../../../utils/db.server";
import { clientSelectData, updateData } from "./config/client.data";
import { Client, NewClient } from "../shared/types";

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
        data: updateData(newClient),
        select: clientSelectData
    })
}

export const updateClient = async (newClient: NewClient, publicId: string): Promise<Client> => {
    return db.client.update({
        where: {
            publicId
        },
        data: updateData(newClient),
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