import express from "express";
import { initDB } from '../DB/index'
import { clientRoute } from './clientRoute'
import { productRoute } from "./productRoute";
import { purchaseRoute } from "./purchaseRoute";
import { providerRoute } from "./providerRoute";

export async function createServer(client: string , product: string ) {
    const db = await initDB(client, product)
    const ClientRoute = clientRoute(db)
    const ProductRoute = productRoute(db)
    const PurchaseRoute = purchaseRoute(db)
    const ProviderRoute = providerRoute(db)

    const app =  express()

    app.use(express.json())
    app.use("/client", ClientRoute)
    app.use("/product", ProductRoute)
    app.use("/purchase", PurchaseRoute)
    app.use("/provider", ProviderRoute)

    app.listen(8080, () =>{
        console.log("listening")
    })
    
}