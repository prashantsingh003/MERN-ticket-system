import axios from "axios";
import { useEffect, useState } from "react";
import { agentsApi, ticketsApi } from "../utils/url";
import { TicketCard } from "../components";
import AgentCard from "../components/AgentCard";
import { NavLink } from "react-router-dom";

export default function Dashboard() {

	const [tickets, setTickets] = useState([]);
	const [agents, setAgents] = useState([]);

	const getTickets = () => {
		axios.get(ticketsApi)
			.then((res) => {
				setTickets(res.data)
			})
	}
	const getAgents = () => {
		axios.get(agentsApi)
			.then((res) => {
				setAgents(res.data)
			})
	}
	useEffect(() => {
		getTickets();
		getAgents();
	}, [])
	return (
		<>
			{/* Agents */}
			<div>
				<h1 className="text-2xl font-bold text-center mb-8 mt-6 px-4 py-3">Meet The Team</h1>

				<div className="flex flex-wrap justify-center gap-y-3">
					{agents.map((agent, index) => (
						<AgentCard key={agent._id} agent={agent} />
					))}
					<div className="max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-4 bg-white shadow-md hover:shadow-xl rounded-md overflow-hidden">

					<NavLink
							to="/create-agent">
						<button
							className="bg-gray-200 hover:bg-gray-300 h-full text-gray-800 font-bold py-4 px-8 rounded-md shadow-lg focus:outline-none focus:ring focus:border-gray-400 block w-full"
						>
							Add Support Agent
						</button>
						</NavLink>
					</div>
				</div>
			</div>
			{/* Tickets */}
			<div className="min-h-screen py-8">
				<div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3">
					<h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Tickets</h1>
					<div className="mb-4">
						{/* Todo form goes here */}
						<NavLink
							to="/create-ticket">
							<button
								className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 px-12 rounded-full shadow-lg focus:outline-none focus:ring focus:border-gray-400 w-full"
							>
								Add Ticket
							</button>
						</NavLink>
						{/* <TodoForm/> */}
					</div>
					<div className="flex flex-wrap gap-y-3">
						{/*Loop and Add TodoItem here */}
						{tickets.map((ticket) => (
							<div key={ticket._id} className='w-full'>
								<TicketCard ticket={ticket} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}