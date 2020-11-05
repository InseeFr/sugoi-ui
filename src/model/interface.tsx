export interface Realm {
	name: string;
	url: string;
	appBranch: string;
	userStorages: UserStorage[];
}

export interface UserStorage {
	name: string;
	userBranch: string;
	organizationBranch: string;
}
