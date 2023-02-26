import express from 'express';
import { DB } from "../DB"

export function productRoute(db: DB){
    const router = express.Router();
    
    router.post("/", async (req, res) => {
        try {
            const result = await db.Products.Insert(req.body)
            res.status(201).json({status: "created", data: result})
        }
        catch (e) {
            res.status(400).json({status: "invalid"})
        }
    })

}