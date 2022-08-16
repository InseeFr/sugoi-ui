import { Group } from './group';
import AttributesApplication from './attributesApplication';

export interface Application {
	name: string;
	owner?: string;
	groups: Group[];
	attributes?: AttributesApplication;
}

export default Application;
