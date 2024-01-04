import { Whoami } from '../model/api/whoami';

export const isAdmin = (user_rights: Whoami): boolean => user_rights.isAdmin;

export const isWriter = (domain_name: string, user_rights: Whoami): boolean =>
	user_rights.writerRealm
		.map((r) => r.toUpperCase())
		.includes(domain_name.toUpperCase()) || isAdmin(user_rights);

export const isReader = (domain_name: string, user_rights: Whoami): boolean =>
	user_rights.readerRealm
		.map((r) => r.toUpperCase())
		.includes(domain_name.toUpperCase()) ||
	isWriter(domain_name, user_rights);

export const isAppManager = (
	app_name: string,
	domain_name: string,
	user_rights: Whoami,
): boolean =>
	user_rights.appManager
		.map((r) => r.toUpperCase())
		.includes(app_name.toUpperCase()) ||
	isWriter(domain_name, user_rights);
