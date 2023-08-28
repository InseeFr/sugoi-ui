import { Mapping } from './mapping';
import { UserStorage } from './userStorage';

export interface Realm {
	name: string;
	url: string;
	appSource: string;
	userStorages: UserStorage[];
	properties: Record<string, string[]>;
	uiMapping: Mapping;
}
