import Address from './address';
import Attributes from './attributes';

export default interface User {
	lastName: string;
	firstName: string;
	mail: string;
	username: string;
	attributes: Attributes;
	address: Address;
}
