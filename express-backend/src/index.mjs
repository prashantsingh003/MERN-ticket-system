import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import SupportAgentsRouter from './routes/SupportAgentsRoutes.mjs';
import SupportTicketsRouter from './routes/SupportTicketsRoutes.mjs';

const PORT = process.env.PORT || 3000;
const mongoURL ="mongodb://0.0.0.0:27017/";

console.log(process.env)
const app=express();

// Middlewares
app.use(express.json());
app.use(cors())

// Routers
app.use('/api/support-agents',SupportAgentsRouter)
app.use('/api/support-tickets',SupportTicketsRouter)

mongoose.connect(mongoURL)
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