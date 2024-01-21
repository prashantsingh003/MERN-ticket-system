export default function About(){
	return (
		<div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6">About the Project</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Technologies Involved:</h3>
        <ul className="list-disc pl-6">
          <li>MongoDB</li>
          <li>Express.js</li>
          <li>Node.js</li>
          <li>React.js</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Tailwind CSS</li>
          <li>MERN stack</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Project Features:</h3>
        <h4 className="text-lg font-semibold mb-2">Frontend:</h4>
        <ul className="list-disc pl-6">
          <li>Creating tickets with auto-assignment using round-robin logic</li>
          <li>Updating existing tickets</li>
          <li>Deleting tickets</li>
          <li>Creating agents</li>
          <li>Switching assignees</li>
        </ul>
      </section>

      <section className="mb-8">
        <h4 className="text-lg font-semibold mb-2">Backend:</h4>
        <ul className="list-disc pl-6">
          <li>MongoDB data connectivity</li>
          <li>REST API</li>
          <li>Thorough validation of data coming into the API with relevant error messages</li>
          <li>Error handling</li>
          <li>Grouping of routes with router</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">APIs:</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>/support-tickets:</strong>
            <ul className="list-disc pl-6">
              <li>GET: get all tickets</li>
              <li>POST: create</li>
            </ul>
          </li>
          <li>
            <strong>/support-tickets/:id:</strong>
            <ul className="list-disc pl-6">
              <li>GET: get ticket and its assigned agent</li>
              <li>PUT: update ticket</li>
              <li>DELETE: delete ticket</li>
            </ul>
          </li>
          <li>
            <strong>/support-tickets/agent/:id:</strong>
            <ul className="list-disc pl-6">
              <li>GET: get all tickets associated with agent</li>
            </ul>
          </li>
          <li>
            <strong>/support-agents:</strong>
            <ul className="list-disc pl-6">
              <li>GET: get all agents</li>
              <li>POST: create agents</li>
            </ul>
          </li>
          <li>
            <strong>/support-agents/:id:</strong>
            <ul className="list-disc pl-6">
              <li>GET: get agent</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
	)
}