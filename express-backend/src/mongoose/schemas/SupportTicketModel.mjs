import mongoose from "mongoose";
const SupportTicketSchema=new mongoose.Schema({
	topic:{
		type:String,
		required:true,
	},
	type:{
		type:String
	},
	description:{
		type:String,
	},
	dateCreated:{
		type: Date,
		default: Date.now,
	},
	severity:{
		type:String,
		enum:['High', 'Normal', 'Low'],
		default:'Normal'
	},
	status:{
		type:String,
		enum:['New', 'Assigned', 'Resolved'],
		default:'New'
	},
	assignedTo:{
		type:mongoose.Schema.Types.ObjectId,
		default:null
	},
	resolvedOn:{
		type:Date
	}
});
export const SupportTicketModel=mongoose.model('SuopportTicketModel',SupportTicketSchema);