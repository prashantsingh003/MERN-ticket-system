import mongoose from "mongoose";
const SupportAgentSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	phone:{
		type:String,
	},
	description:{
		type:String,
	},
	active:{
		type:Boolean,
		default: true
	},
	// lastAssigned:{
	// 	type:Boolean,
	// 	default:false
	// },
	dateCreated:{
		type:Date,
		default: Date.now,
	}
})
export const SupportAgentModel = mongoose.model('SupportAgentModel', SupportAgentSchema);