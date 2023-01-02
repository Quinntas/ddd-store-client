import { db } from "../../../utils/db.server";
const jwt = require("jsonwebtoken");
import { verifyEncryptedValue } from "../../../utils/encryption";

const JWT_TOKEN = process.env.JWT_TOKEN;


export const login = async (email: string, password: string, expiresIn: string = '1h'): Promise<Object | null> => {
    const user = await db.user.findUnique({ where: { email } })
    if (!verifyEncryptedValue(password, user?.password))
        return null
    const data = {
        publicId: user?.publicId,
    }
    const token = jwt.sign(data, JWT_TOKEN, {
        expiresIn: expiresIn,
    });
    return token
}
