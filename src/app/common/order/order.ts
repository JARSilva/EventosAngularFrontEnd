import { Client } from '../client/client';
import { Event } from '../event/event';

export class Order {
    id : number;
	orderDate : Date;
	total : number;
	qtd : number;  
	client : Client;
	event : Event;
}
