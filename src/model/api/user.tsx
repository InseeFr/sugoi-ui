import Address from './address';
import Attributes from './attributes';
import { Habilitation } from './habilitation';

export default interface User {
	lastName?: string;
	firstName?: string;
	mail?: string;
	username?: string;
	attributes?: Attributes;
	address?: Address;
	habilitations?: Habilitation[];
	groups: string[];
	metadatas?: string[];
}
