import Layout from "./Layout"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider,Navigate  } from "react-router-dom";
import {Home} from "./components";
import { About, CreateAgent, CreateTicket, Dashboard } from "./pages";
const Router=createBrowserRouter(
  createRoutesFromElements(
		<Route path="/" element={<Layout/>}>
			<Route path="" element={<Dashboard/>}/>
			<Route path="dashboard" element={<Dashboard/>}/>
			<Route path="about" element={<About/>}/>
			<Route path="create-agent/" element={<CreateAgent/>}/>
			<Route path="create-ticket/" element={<CreateTicket/>}/>
			<Route path="create-ticket/:id" element={<CreateTicket/>}/>
			{/* <Route path="contact" element={()=>{window.location = "http://www.w3schools.com"}}/> */}
			{/* <Route path="about" element={<About/>}/>
			<Route path="contact" element={<Contact/>}/>
      <Route 
        path="github" 
        element={<Github/>}
        loader={getGithub}
      />
      <Route path="user/:id" element={<User/>}/> */}
		</Route>
	)
)
export default Router;