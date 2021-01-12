import { Pageable } from '../../model/api/pageable';
import User from '../../model/api/user';
import searchRequestUser from '../../model/js/searchRequestUser';
import Users from './data/users.json';
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
): Promise<Pageable> =>
	Promise.resolve({
		results: Users,
		totalElements: 20,
		nextStart: 0,
		hasMoreResult: true,
		pageSize: 20,
	});

export const getUser = async (
	realm: string,
	identifiant: string,
): Promise<User[]> => {
	const pageable = await getUsers(realm, { identifiant });
	return pageable.results[0];
};

export const deleteUser = (realm: string, id: string): Promise<string> =>
	Promise.resolve('');

export const postUser = (realm: string, user: User): Promise<User> =>
	Promise.resolve(user);

export const updateUser = (
	realm: string,
	id: string,
	user: User,
): Promise<User> => Promise.resolve(user);
