import { ShowHouse } from '../showhouse/show-house';
import { Order } from '../order/order';
import { Contact } from '../contact/contact';
import { Role } from '../Role/role';

export class Client {
    id : number;
	username : string;
	password : string;
	name : string;
	cpf : string;
	birthDate : Date;
	email : string;
	showHouses : ShowHouse[]; 
	events : Event[];
	contacts : Contact[]; 
	orders : Order[];
	roles : Role[];
}
