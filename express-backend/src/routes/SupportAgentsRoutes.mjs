import { Router } from "express";
import { CreateSupportAgentValidationSchema } from "../validations/CreateSupportAgentValidationSchema.mjs";
import { SupportAgentModel } from "../mongoose/schemas/SupportAgentModel.mjs";
import { checkSchema,matchedData,validationResult } from "express-validator";
import mongoose from "mongoose";
import { SupportTicketModel } from "../mongoose/schemas/SupportTicketModel.mjs";

const router=Router();

// get all support agents
router.get("/",async (request,response)=>{
	const allAgents=await SupportAgentModel.find()
	response.send(allAgents);
})

// create support agents
router.post(
	"/",
	checkSchema(CreateSupportAgentValidationSchema),
	(request,response)=>{
		// Validation
		const verifiedValidations=validationResult(request);
		if(!verifiedValidations.isEmpty()){
			response.status(400).send({errors:verifiedValidations.array()});
			return
		}
		const validSupportAgent=matchedData(request);
		console.log(validSupportAgent)
		SupportAgentModel.create(validSupportAgent)
			.then(data => {
				response.status(201).send({ data, success: true });
			})
			.catch(err => {
				console.log(err)
				response.status(400).send({ success: false });
			})
})

// get agent and its relevant tickets
router.get("/:id",async (request,response)=>{
	const { params } = request;
	const agentId=new mongoose.Types.ObjectId(params.id);
	const agent=await SupportAgentModel.findOne({_id:agentId});
	if(!agent){
		response.status(400).send({errorMesage:"invalid agent id"})
	}
	const tickets=await SupportTicketModel.find({assignedTo:agentId});
	response.status(201).send({agent,tickets})
})
export default router;