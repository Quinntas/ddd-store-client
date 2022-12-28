import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"

import { clientRouter } from "./api/v1/clients/clients.router";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use("/api/v1/client", clientRouter)

APP.listen(PORT, ()=>{
    console.log(`LISTENING ON PORT ${PORT}`)
})