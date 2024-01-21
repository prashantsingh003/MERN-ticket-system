import { useEffect, useState } from "react"
import { ticketsApi } from "../utils/url"
import axios from "axios"
import { NavLink } from "react-router-dom";

export default function TicketCard({ ticket }) {
	const [agent, setAgent] = useState(null);

	const getStatusColor = (status) => {
		const res = {
			Low: 'green',
			Normal: 'blue',
			High: 'red'
		}
		return res[status]
	}
	useEffect(() => {
		axios.get(ticketsApi + ticket._id)
			.then(res => {
				console.log(res.data);
				setAgent(res.data.agent);
			})
	}, [])
	return (
		<>
			<div className="max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white shadow-md hover:shadow-xl rounded-md overflow-hidden">
				<div className="p-4">
					<div className="font-bold text-xl mb-2 flex justify-between">
						{ticket.topic}
						<NavLink
							to={"/create-ticket/" + ticket._id}>
							Edit
						</NavLink>
					</div>
					<p className="text-gray-700 text-base">{ticket.description}</p>
				</div>
				<div className="flex justify-between items-center bg-gray-100 px-4 py-2">
					<div className="flex space-x-2">
						<span>Severity:
						</span><span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold bg-${getStatusColor(ticket.severity)}-200 text-${getStatusColor(ticket.severity)}-700`}>
							{ticket.severity}
						</span>
						<span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold  text-orange-500`}>
							{ticket.status}
						</span>
					</div>
					<div className="flex space-x-2">
						<span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-gray-200 text-gray-700">
							{ticket.type}
						</span>
						<span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-gray-200 text-gray-700">
							{ticket.assignedTo ? `Assigned to ${agent?.name}` : 'Unassigned'}
						</span>
					</div>
				</div>
				<div className="p-4">
					<p className="text-gray-600 text-sm">Created on {new Date(ticket.dateCreated).toLocaleString()}</p>
				</div>
			</div>
		</>
	)
}