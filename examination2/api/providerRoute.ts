import express from 'express';
import { DB } from "../DB"

export function providerRoute(db: DB){
    const router = express.Router();
    
    router.post("/", async (req, res) => {
        try {
            const result = await db.Providers.Insert(req.body)
            res.status(201).json({status: "created", data: result})
        }
        catch (e) {
            res.status(400).json({status: "invalid"})
        }
    })

    router.get("/:providerID", async (req ,res) => {
        try {
            const success = await db.Providers.getProvidersProducts(req.params.providerID)
            res.status(200).json({data: success})
        } 
        catch (e) {
            res.status(400).json({status: "invalid"})
        }
    })

    router.get("/:providerID/purchases", async (req ,res) => {
        try {
            const success = await db.Providers.getProvidersPurchases(req.params.providerID)
            res.status(200).json({data: success})
        } 
        catch (e) {
            res.status(400).json({status: "invalid"})
        }
    })

    router.delete("/:providerID", async (req ,res) => {
        try {
            const success = await db.Providers.delete(req.params.providerID)
            res.status(200).json({data: success})
        } 
        catch (e) {
            res.status(400).json({status: "could not delete"})
        }
    })

}