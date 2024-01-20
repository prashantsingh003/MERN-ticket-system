import { Outlet } from "react-router-dom";
import { Header,Footer } from "./components";
Outlet
export default function Layout({ children }){
	return (
		<>
		<Header></Header>
		<Outlet></Outlet>
		<Footer></Footer>
		</>
	)
}