import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Pageable } from '../../model/api/pageable';
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
): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/users', {
				params: {
					identifiant,
					nomCommun,
					description,
					organisationId,
					size: 500,
					start,
					searchCookie,
					typeRecherche,
					habilitations,
					application,
				},
			})
			.then((r: any) => r.data),
	);

export const getUser = async (realm: string, id: string): Promise<User> => {
	const pageable = await getUsers(realm, { identifiant: id });
	return pageable.results[0];
};

export const deleteUser = (realm: string, id: string) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/' + realm + '/users/' + id)
			.then((r: any) => r.data),
	);

export const postUser = (realm: string, user: User) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/' + realm + '/users', {
				data: { ...user },
			})
			.then((r: any) => r.data),
	);

export const updateUser = (realm: string, id: string, user: User) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/' + realm + '/users/' + id, { data: { ...user } })
			.then((r: any) => r.data),
	);
