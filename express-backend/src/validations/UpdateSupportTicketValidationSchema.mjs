export const UpdateSupportTicketValidationSchema={
	topic:{
		isString: {
			notEmpty:false,
			errorMessage: "topic must be a string!",
		}
	},
	description:{
		notEmpty:false,
		isString:true,
	},
	type:{
		notEmpty:false,
		isString:{
			errorMessage: "type must be a string!",
		}
	},
	severity:{
		notEmpty:false,
		matches: {
      options: [/\b(?:High|Normal|Low)\b/],
      errorMessage: "Invalid severity, options: High, Normal, Low"
    },
	},
	status:{
		notEmpty:false,
		matches: {
      options: [/\b(?:New|Assigned|Resolved)\b/],
      errorMessage: "Invalid status, use: New, Assigned, Resolved"
    }
	},
	assignedTo:{
		notEmpty:false,
		isString:true
	}
}