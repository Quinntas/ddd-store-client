import { db } from "../../../utils/db.server";
import { selectData, updateData } from "./config/client.data";
import { Client, NewClient } from "../../../types";

export const getClient = async (publicId: string): Promise<Client | null> => {
    return db.client.findUnique({
        where: {
            publicId
        },
        select: selectData
    })
}

export const createClient = async (newClient: NewClient): Promise<Client> => {
    return db.client.create({
        data: updateData(newClient),
        select: selectData
    })
}

export const updateClient = async (newClient: NewClient, publicId: string): Promise<Client> => {
    return db.client.update({
        where: {
            publicId
        },
        data: updateData(newClient),
        select: selectData,
    })
}

export const deleteClient = async (publicId: string): Promise<Client> => {
    return db.client.delete({
        where: {
            publicId
        },
        select: selectData,
    })
}