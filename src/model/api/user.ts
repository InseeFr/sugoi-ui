import Address from './address';
import Attributes from './attributes';
import { Group } from './group';
import { Habilitation } from './habilitation';

export default interface User {
	lastName?: string;
	firstName?: string;
	mail?: string;
	username?: string;
	attributes?: Attributes;
	certificate?: String;
	address?: Address;
	habilitations: Habilitation[];
	groups: Group[];
	metadatas?: string[];
}
