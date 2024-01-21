import React from 'react';

const AgentCard = ({ agent }) => {
  return (
    <div className="max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-4 bg-white shadow-md hover:shadow-xl rounded-md overflow-hidden">
      <div className="p-4 border-b border-gray-300">
        <div className="font-bold text-xl mb-2">{agent.name}</div>
        <p className="text-gray-700 text-base">{agent.description}</p>
      </div>
      <div className="px-4 py-2">
        <div className="flex items-center mb-2">
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${agent.active ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
            {agent.active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-600">Email: {agent.email}</span>
          <span className="text-sm text-gray-600">Phone: {agent.phone}</span>
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <p className="text-gray-600 text-sm">Joined on {new Date(agent.dateCreated).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AgentCard;