import mongoose from "mongoose";
const SupportAgentSchema=new mongoose.Schema({
	name:{
		type:mongoose.Schema.Types.String,
		required:true,
	},
	email:{
		type:mongoose.Schema.Types.String,
		required:true,
		unique:true
	},
	phone:{
		type:mongoose.Schema.Types.String,
	},
	description:{
		type:mongoose.Schema.Types.String,
	},
	active:{
		type:mongoose.Schema.Types.Boolean,
		default: true
	},
	dateCreated:{
		type:mongoose.Schema.Types.Date,
		default: Date.now,
	}
})
export const SupportAgentModel = mongoose.model('SupportAgentModel', SupportAgentSchema);