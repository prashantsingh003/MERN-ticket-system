import { Router, response } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { CreateSupportTicketValidationSchema } from "../validations/CreateSupportTicketValidationSchema.mjs";

import { SupportTicketModel } from "../mongoose/schemas/SupportTicketModel.mjs";
import { SupportAgentModel } from "../mongoose/schemas/SupportAgentModel.mjs";
import { TrackAssignTicketModel } from "../mongoose/schemas/TrackAssignTicketSchema.mjs";
import mongoose from "mongoose";
import { UpdateSupportTicketValidationSchema } from "../validations/UpdateSupportTicketValidationSchema.mjs";

const router = Router()

// get all support tickets
router.get("/", async (request, response) => {
	const { params } = request;
	const results=await SupportTicketModel.find();
	response.status(201).send(results);
})

// create support tickets
router.post(
	"/",
	checkSchema(CreateSupportTicketValidationSchema),
	async (request, response) => {
		// Validation
		const verifiedValidations = validationResult(request);
		if (!verifiedValidations.isEmpty()) {
			response.status(400).send({ errors: verifiedValidations.array() });
			return
		}
		let ticket = matchedData(request);

		// Handle No agents
		const activeAgents=await SupportAgentModel.find({active:true});
		let assignedAgentId=null;
		if (activeAgents.length === 0) {
      return res.status(400).json({ error: 'No active support agents available' });
    }
		let indexStore=await TrackAssignTicketModel.findOne();
		if(!indexStore){
			indexStore=await TrackAssignTicketModel.create({});//default assingment in schema
		}
		const lastAssignedIndex=indexStore.lastIndex;
		const nextAgentIndex = (lastAssignedIndex + 1) % activeAgents.length;
		const assignedAgent = activeAgents[nextAgentIndex];
		assignedAgentId=assignedAgent._id

		ticket={...ticket,assignedTo:assignedAgentId,status:'Assigned'}

		SupportTicketModel.create(ticket)
			.then(async data => {
				await TrackAssignTicketModel.findOneAndUpdate({lastIndex:lastAssignedIndex},{lastIndex:nextAgentIndex})
				response.status(200).send({ data, success: true });
			})
			.catch(err => {
				console.log(err)
				response.status(400).send({ success: false });
			})
	})

router.get(
	'/:id',
	async (request,response)=>{
		const { params } = request;
		const ticketId=new mongoose.Types.ObjectId(params.id);
		const ticket=await SupportTicketModel.findOne({_id:ticketId});
		if(!ticket){
			response.status(400).send({ errorMessage:'invalid id' });
		}
		const agentId=ticket.assignedTo;
		const agent=await SupportAgentModel.findOne({_id:agentId});
		response.status(201).send({ticket,agent})
	}
)

router.put(
	'/:id',
	checkSchema(UpdateSupportTicketValidationSchema),
	async (request,response)=>{
		// Validation
		const verifiedValidations = validationResult(request);
		if (!verifiedValidations.isEmpty()) {
			response.status(400).send({ errors: verifiedValidations.array() });
			return
		}
		const body = matchedData(request);
		const allowedKeys=["description","status","severity","topic","type","assignedTo"]
		const updateTicket={}
		await allowedKeys.forEach(async (key)=>{
			if(body[key]){
				if(key=='status' && body[key]=="Resolved")
					updateTicket["resolvedOn"]=true;
				else if(key=="assignedTo"){
					const agentId=new mongoose.Types.ObjectId(body[key])
					const agent=await SupportAgentModel.findOne({_id:agentId,active:true})
					if(!agent) {
						response.status(404).send({errorMessage:"invalid or inactive support agent"})
						return
					};
				}
				updateTicket[key]=body[key];
			}
		});
		const { params } = request;

		const ticketId=new mongoose.Types.ObjectId(params.id);
		SupportTicketModel.findOneAndUpdate({_id:ticketId},{"$set":updateTicket})
			.then(data => {
				response.status(200).send({ success: true });
			})
			.catch(err => {
				response.status(400).send({ success: false });
			})
	}
)
router.delete(
	'/:id',async (request,response)=>{
		const { params } = request;
		const ticketId=new mongoose.Types.ObjectId(params.id);
		const result = await SupportTicketModel.findByIdAndDelete(ticketId);
		console.log(result)
		if(result)
			return response.status(200).send({success:true})
		response.status(400).send({success:false})
	}
)

router.get('/agent/:id',(request,response)=>{
	const { params } = request;
	const agentId=new mongoose.Types.ObjectId(params.id);
	SupportTicketModel.find({assignedTo:agentId})
	.then(res=>{
		response.status(200).send(res)
		console.log(res)
	})
	.catch(err => {
		response.status(400).send({ success: false,error:err});
	})
})
export default router;