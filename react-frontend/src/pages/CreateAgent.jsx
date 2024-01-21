import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { agentsApi } from '../utils/url';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAgent = () => {
	const {id}=useParams();
	const [message,setMessage]=useState(null);
	const [isEditable,setIsEditable]=useState(false);


  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    description: '',
    active: true,
  };
	const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitReq=()=>isEditable ?axios.put(agentsApi+id,formData):axios.post(agentsApi,formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
		submitReq()
		.then(res=>{
			setMessage({success:true})
			setTimeout(() => {
				navigate('/')
			}, 1000);
		})
		.catch(err=>{
			setMessage({success:false})
		})
  };
	
	useEffect(()=>{
		if(!id) return;
		setIsEditable(true);
		axios.get(agentsApi+id).then(res=>{
			agent=res.data;
			const data={
				name: agent.name,
				email: agent.email,
				phone: agent.phone,
				description: agent.description,
				active: agent.active,
			}
			setFormData(data);
		})
	},[])

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
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
          <label htmlFor="active" className="flex items-center">
            <input
							disabled={!isEditable}
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={() => setFormData({ ...formData, active: !formData.active })}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-600">Active</span>
          </label>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Support Agent
          </button>
        </div>
      </form>
      {message && (
        <div className={`mt-4 bg-${message.success?"green":"red"}-100 border border-${message.success?"green":"red"}-400 text-${message.success?"green":"red"}-700 px-4 py-2 rounded`}>
          {message.success?`Agent ${isEditable?'updated':'created'} successfully!`:`Error occured !!`}
        </div>
      )}
    </div>
  );
};

export default CreateAgent;
