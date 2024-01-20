export const CreateSupportAgentValidationSchema={
	name:{
		notEmpty:{
			errorMessage: "name cannot be empty",
		},
		isLength: {
			options: {
				min: 3,
				max: 150,
			},
			errorMessage:
				"name must be at least 3 characters with a max of 150 characters",
		},
		isString: {
			errorMessage: "name must be a string!",
		}
	},
	email:{
		isEmail:{
			errorMessage: "Invalid Email",
		},
		notEmpty:{
			errorMessage: "Email cannot be empty",
		},
	},
	phone:{
		notEmpty:false,
		isMobilePhone:{
			errorMessage: "Invalid phone number",
		}
	},
	description:{
		notEmpty:false,
	}
}