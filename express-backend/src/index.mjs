import express from 'express';
import mongoose from 'mongoose';
import {query, validationResult,body, matchedData, checkSchema} from 'express-validator';

import SupportAgentsRouter from './routes/SupportAgent.mjs';
import SupportTicketsRouter from './routes/SupportAgent.mjs';

const PORT = process.env.PORT || 3000;

console.log(process.env)
const app=express();

// Middlewares
app.use(express.json());

// Routers
app.use('/api/support-agents',SupportAgentsRouter)
app.use('/api/support-tickets',SupportTicketsRouter)

mongoose.connect(
	"mongodb://0.0.0.0:27017/", 
	{ useNewUrlParser: true, useUnifiedTopology: true }
	)
.then(res => {
	console.log('mongoDB connected to ' + res.connection.host);
})
.catch(e => {
	console.log('cant connect to mongo')
	console.log(e);
})

app.listen(PORT,()=>{
	console.log('App running on port: '+PORT)
})