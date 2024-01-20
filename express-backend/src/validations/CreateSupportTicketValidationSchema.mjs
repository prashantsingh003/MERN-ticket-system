export const CreateSupportTicketValidationSchema={
	topic:{
		notEmpty:{
			errorMessage: "topic cannot be empty",
		},
		isString: {
			errorMessage: "topic must be a string!",
		}
	},
	description:{
		notEmpty:false,
	},
	type:{
		isString:{
			errorMessage: "type must be a string!",
		}
	},
	severity:{
		notEmpty:{
			errorMessage: "severity cannot be empty",
		},
		matches: {
      options: [/\b(?:High|Normal|Low)\b/],
      errorMessage: "Invalid severity, options: High, Normal, Low"
    },
	},
	// status:{
	// 	matches: {
  //     options: [/\b(?:new|assigned|resolved)\b/],
  //     errorMessage: "Invalid status, use: New, Assigned, Resolved"
  //   }
	// },
}