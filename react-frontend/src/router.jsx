import Layout from "./Layout"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import {Home} from "./components";
const Router=createBrowserRouter(
  createRoutesFromElements(
		<Route path="/" element={<Layout/>}>
			<Route path="" element={<Home/>}/>
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