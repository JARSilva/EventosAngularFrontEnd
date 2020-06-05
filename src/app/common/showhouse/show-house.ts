import { Client } from '../client/client';
import { Event } from '../event/event';

export class ShowHouse {
    id : number;
	name : string;
	capacity : number;
	cep : string; 
	address : string;
	number : string;
	city : string;
	state : string;
	events : Event[];
	client : Client;
}
