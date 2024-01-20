import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { CreateSupportTicketValidationSchema } from "../validations/CreateSupportTicketValidationSchema.mjs";

import { SupportTicketModel } from "../mongoose/schemas/SupportTicketModel.mjs";

const router = Router()

// create support tickets
router.post(
	"/",
	checkSchema(CreateSupportTicketValidationSchema),
	(request, response) => {
		// Validation
		const verifiedValidations = validationResult(request);
		if (!verifiedValidations.isEmpty()) {
			response.status(400).send({ errors: verifiedValidations.array() });
			return
		}
		const validData = matchedData(request);

		SupportTicketModel.create(validData)
			.then(data => {
				response.status(200).send({ data, success: true });
			})
			.catch(err => {
				console.log(err)
				response.status(400).send({ success: false });
			})
	})


// get all support tickets
router.get("/", (request, response) => {
	const { params } = request;
	SupportTicketModel.find()
		.then(data => {
			response.send({ data, success: true });
		})
		.catch(err => {
			response.send({ success: false, err })
		})
})
export default router;