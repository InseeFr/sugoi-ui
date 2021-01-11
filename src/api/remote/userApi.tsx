import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
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
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/Users', {
				params: {
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
				},
			})
			.then((r: any) => r.data),
	);

export const getUser = (realm: string, id: string) =>
	getUsers(realm, { identifiant: id });

export const deleteUser = (realm: string, id: string) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/' + realm + '/Users/' + id)
			.then((r: any) => r.data),
	);

export const postUser = (realm: string, user: User) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/' + realm + '/Users', {
				data: { ...user },
			})
			.then((r: any) => r.data),
	);

export const updateUser = (realm: string, id: string, user: User) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/' + realm + '/Users/' + id, { data: { ...user } })
			.then((r: any) => r.data),
	);
