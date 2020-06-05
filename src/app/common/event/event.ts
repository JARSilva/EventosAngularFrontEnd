import { Order } from '../order/order';
import { ShowHouse } from '../showhouse/show-house';
import { Client } from '../client/client';

export class Event {
    id : number;
    name : string;
	description : string;
	date : Date;
	price : number;
	qtdTicket : number;
	client : Client;
	showHouse : ShowHouse;
	orders : Order[];

}
