import { Router } from "express";
const router=Router()

// create support tickets
router.post("/",(request,response)=>{
	return response.sendStatus(201)
})


// get all support tickets
router.get("/",(request,response)=>{
	const {params}=request;
	console.log(params);
	return response.status(201).send(params)
})
export default router;