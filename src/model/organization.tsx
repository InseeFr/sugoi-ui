import Address from './address';
import Attributes from './attributes';

export default interface Organization {
	identifiant: string;
	organization?: Organization;
	attributes: Attributes;
	address: Address;
	metadatas: string[];
}
