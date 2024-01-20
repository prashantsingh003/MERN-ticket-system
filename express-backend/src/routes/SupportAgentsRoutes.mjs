import { Router } from "express";
import { CreateSupportAgentValidationSchema } from "../validations/CreateSupportAgentValidationSchema.mjs";
import { SupportAgentModel } from "../mongoose/schemas/SupportAgentModel.mjs";
import { checkSchema,matchedData,validationResult } from "express-validator";

const router=Router();

// create support agents
router.post(
	"/",
	checkSchema(CreateSupportAgentValidationSchema),
	(request,response)=>{
		// Validation
		const verifiedValidations=validationResult(request);
		if(!verifiedValidations.isEmpty()){
			response.status(400).send({errors:verifiedValidations.array()});
		}
		const validSupportAgent=matchedData(request);

		SupportAgentModel.create(validSupportAgent)
			.then(data => {
				response.status(201).send({ data, success: true });
			})
			.catch(err => {
				console.log(err)
				response.status(400).send({ success: false });
			})
})

// get all support agents
router.get("/",(request,response)=>{
	response.status(201).send("get all tickets")
})

export default router;