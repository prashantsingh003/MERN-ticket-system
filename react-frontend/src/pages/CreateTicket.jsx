import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { agentsApi, ticketsApi } from '../utils/url';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTicket = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [agents, setAgents] = useState([]);
	const [isEditable, setIsEditable] = useState(false);
	const initialFormData = {
		topic: '',
		type: '',
		description: '',
		severity: 'Normal',
		status: 'New',
		assignedTo: null,
	};

	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(false);

	const getAgents = () => {
		axios.get(agentsApi)
			.then((res) => {
				setAgents(res.data)
			})
	}
	const getTicketData = () => {
		axios.get(ticketsApi + id)
			.then((res) => {
				const { ticket, agent } = res.data;
				const state = {
					topic: ticket.topic,
					type: ticket.type,
					description: ticket.description,
					severity: ticket.severity,
					status: ticket.status,
					assignedTo: ticket.assignedTo,
				}
				setFormData(state);
			})
	}
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const createTicket = () => {
		axios.post(ticketsApi, formData).then(res => {
			console.log(res)
			setMessage({msg:"created successfully", success: true })
			setTimeout(() => {
				navigate('/')
			}, 1000);
		})
			.catch(err => {
				console.log(err)
				setMessage({ success: false })
			})
	}
	const updateTicket = () => {
		axios.put(ticketsApi+id, formData).then(res => {
			console.log(res)
			setMessage({msg:"updated successfully", success: true })
			setTimeout(() => {
				navigate('/')
			}, 1000);
		})
			.catch(err => {
				console.log(err)
				setMessage({ success: false })
			})
	}
	const deleteTicket = () => {
		if(confirm("Confirm delete"))
		axios.delete(ticketsApi+id).then(res => {
			setTimeout(() => {
				navigate('/')
			}, 500);
			setMessage({msg:"deleted successfully", success: true })
			setFormData(initialFormData)
		})
			.catch(err => {
				console.log(err)
				setMessage({ success: false })
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(isEditable)
			updateTicket();
		else
			createTicket();
	};
	useEffect(() => {
		if (!id) return;
		setIsEditable(true);
		getAgents();
		getTicketData();
	}, [])

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			<h2 className="text-2xl font-semibold mb-6">{isEditable ? 'Update' : 'Create'} Ticket</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="topic" className="block text-sm font-medium text-gray-600">
						Topic
					</label>
					<input
						type="text"
						id="topic"
						name="topic"
						value={formData.topic}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="type" className="block text-sm font-medium text-gray-600">
						Type
					</label>
					<input
						type="text"
						id="type"
						name="type"
						value={formData.type}
						onChange={handleChange}
						className="mt-1 p-2 w-full border rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="description" className="block text-sm font-medium text-gray-600">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 p-2 w-full border rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="severity" className="block text-sm font-medium text-gray-600">
						Severity
					</label>
					<select
						id="severity"
						name="severity"
						value={formData.severity}
						onChange={handleChange}
						className="mt-1 p-2 w-full border rounded-md"
					>
						<option value="High">High</option>
						<option value="Normal">Normal</option>
						<option value="Low">Low</option>
					</select>
				</div>
				<div className="mb-4">
					<label htmlFor="status" className="block text-sm font-medium text-gray-600">
						Status
					</label>
					<select
						id="status"
						name="status"
						disabled={!isEditable}
						value={formData.status}
						onChange={handleChange}
						className="mt-1 p-2 w-full border rounded-md"
					>
						<option disabled={isEditable} value="New">New</option>
						<option disabled={isEditable} value="Assigned">Assigned</option>
						<option value="Resolved">Resolved</option>
					</select>
				</div>
				{
					isEditable ?
						<div className="mb-4">
							<label htmlFor="assignedTo" className="block text-sm font-medium text-gray-600">
								Assigned To
							</label>
							<select
								id="assignedTo"
								name="assignedTo"
								value={formData.assignedTo}
								onChange={handleChange}
								className="mt-1 p-2 w-full border rounded-md"
							>
								{agents.map((agent) => {
									return (
										<option value={agent._id}>{agent.name}</option>
									)
								})}
							</select>
						</div>
						: null
				}
				<div className="mt-6 flex justify-between">
					<button
						type="submit"
						className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
					>
						{isEditable ? 'Update' : 'Create'} Ticket
					</button>
					<button
						onClick={deleteTicket}
						className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
					>
						Delete Ticket
					</button>
				</div>
			</form>
			{message && (
				<div className={`mt-4 bg-${message.success ? "green" : "red"}-100 border border-${message.success ? "green" : "red"}-400 text-${message.success ? "green" : "red"}-700 px-4 py-2 rounded`}>
					{message.success ? `Ticket ${message.msg} successfully!` : `Error occured !!`}
				</div>
			)}
		</div>
	);
};

export default CreateTicket;