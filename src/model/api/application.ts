import { Group } from './group';

export interface Application {
	name: string;
	owner?: string;
	groups: Group[];
}

export default Application;
