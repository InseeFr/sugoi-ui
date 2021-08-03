import { Mapping } from './mapping';
import { UserStorage } from './userStorage';

export interface Realm {
	name: string;
	url: string;
	appBranch: string;
	userStorages: UserStorage[];
	properties: any;
	uiMapping: Mapping;
}
