import Address from './address';
import Attributes from './attributes';

export default interface Organization {
	identifiant?: string;
	organization?: Organization;
	gpgkey?: any;
	attributes?: Attributes;
	address?: Address;
	metadatas?: string[];
}
