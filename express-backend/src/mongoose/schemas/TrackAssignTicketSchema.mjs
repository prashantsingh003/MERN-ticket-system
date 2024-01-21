import mongoose from "mongoose";
const TrackAssignTicketSchema=new mongoose.Schema({
	lastIndex:{
		type:Number,
		default:0,
	},
	lastUpdated:{
		type:Date,
		default:Date.now
	}
})
export const TrackAssignTicketModel=mongoose.model('TrackAssignTicketModel',TrackAssignTicketSchema);