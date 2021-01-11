import User from '../../model/api/user';
import searchRequestUser from '../../model/js/searchRequestUser';

export const getUsers = (
	realm: string,
	{
		identifiant,
		nomCommun,
		description,
		organisationId,
		size,
		start,
		searchCookie,
		typeRecherche,
		habilitations,
		application,
	}: searchRequestUser,
): Promise<User[]> => Promise.resolve([{ username: 'toto' }]);

export const getUser = (realm: string, identifiant: string): Promise<User[]> =>
	getUsers(realm, { identifiant });

export const deleteUser = (realm: string, id: string): Promise<string> =>
	Promise.resolve('');

export const postUser = (realm: string, user: User): Promise<User> =>
	Promise.resolve(user);

export const updateUser = (
	realm: string,
	id: string,
	user: User,
): Promise<User> => Promise.resolve(user);
