import { createContext, useContext } from "react";

export const TicketsContext=createContext({
	Tickets:[],
	addTicket:(Ticket)=>{},
	updateTicket:(id,Ticket)=>{},
	deleteTicket:(id)=>{},
	toggleCompleted:(id)=>{},
});

export const TicketsConTextProvider=TicketsContext.Provider;

export const useTicketContext=()=>{
	return useContext(TicketsContext);
}