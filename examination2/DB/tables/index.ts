import { Sequelize } from "sequelize";
import { clientInterface, createClientsTable } from './clientTable'
import { purchaseInterface, createPurchasesTable } from './PurchasesTable'
import { providerInterface, createProviderTable } from "./providerTable"
import { productInterface, createProductsTable } from "./productTable"
import { getConnection } from "../connectDB";

export async function initTables( client, product ) {
    const connection = getConnection()
    const clients = await createClientsTable(connection)
    const providers = await createProviderTable(connection)
    const purchases = await createPurchasesTable(connection, client, product)
    const products = await createProductsTable(connection)

    return {
        Clients: clients,
        Providers: providers,
        Purchases: purchases,
        Products: products
    }
}

export type DB = {
    Clients: clientInterface,
    Purchases: purchaseInterface,
    Providers: providerInterface,
    Products: productInterface
}