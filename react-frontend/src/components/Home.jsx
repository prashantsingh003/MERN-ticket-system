import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ticketsApi } from '../utils/url';
import axios from 'axios';

export default function Home() {
	const [tickets,setTickets]=useState([]);
	const getTickets=()=>{
		axios.get(ticketsApi)
		.then((res)=>{
			setTickets(res.data)
		})
	}
	useEffect(getTickets,[])
	return (
		<div className="mx-auto w-full max-w-7xl">
			Home
		</div>
	);
}
