export interface Whoami {
	id: string;
	readerRealm: string[];
	writerRealm: string[];
	appManager: string[];
	passwordRealm: string[];
	isAdmin: boolean;
}
