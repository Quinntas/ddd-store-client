import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { clientRouter } from "./api/v1/client/client.router";
import { shopkeeperRouter } from "./api/v1/shoopkeeper/shopkeeper.router";
import { loginRouter } from "./api/v1/login/login.router";
import { registerRouter } from "./api/v1/register/register.router";
import { transactionRouter } from "./api/v1/transaction/transaction.router";
import errorMiddleware from "./middleware/error.middleware";

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json');

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10)

const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
APP.use("/api/v1/client", clientRouter)
APP.use("/api/v1/shopkeeper", shopkeeperRouter)
APP.use("/api/v1/login", loginRouter)
APP.use("/api/v1/register", registerRouter)
APP.use("/api/v1/transaction", transactionRouter)
APP.use(errorMiddleware)

APP.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})