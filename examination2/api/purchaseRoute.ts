import express from 'express';
import { DB } from "../DB"

export function purchaseRoute(db: DB){
      
    const router = express.Router();
    
    router.post("/", async (req, res) => {
        try {
            const result = await db.Purchases.Insert(req.body.client, req.body.product, req.body.price)
            res.status(201).json({status: "client added", data: result})
        }
        catch (e) {
            res.status(400).json({status: "invalid client input"})
        }
    })
}