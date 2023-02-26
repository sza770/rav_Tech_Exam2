import * as Tables from "./tables"
import { getConnection } from "./connectDB"

export async function initDB(client, product) {
    const connection = getConnection()
    const tables = await Tables.initTables(client, product )
    return tables

}

export type DB = Tables.DB