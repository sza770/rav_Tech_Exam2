import express from "express";
import { DB } from "../DB"

export function clientRoute(db: DB){
    
    const router = express.Router();
    
    router.post("/", async (req, res) => {
        try {
            const result = await db.Clients.Insert(req.body)
            res.status(201).json({status: "client added", data: result})
        }
        catch (e) {
            res.status(400).json({status: "invalid client input"})
        }
    })
}