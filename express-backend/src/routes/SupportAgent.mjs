import { Router } from "express";
const router=Router();

// create support agents
router.post("/",(request,response)=>{
	return response.sendStatus(201)
})

// get all support agents
router.get("/",(request,response)=>{
	return response.status(201).send("get all tickers")
})

export default router;