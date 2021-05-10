import { AxiosInstance } from 'axios';
import { getClient } from '../../configuration/axios-configuration';
import { Pageable } from '../../model/api/pageable';
import User from '../../model/api/user';
import searchRequestUser from '../../model/js/searchRequestUser';
import axios from 'axios';

//cancel previous request if new one is send before receive previous request
let cancelToken: any = undefined;

export const getUsers = (token?: string) => (
	realm: string,
	{
		mail,
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
	getClient().then((client: AxiosInstance) => {
		//Check if there are any previous pending requests
		if (typeof cancelToken != typeof undefined) {
			cancelToken.cancel('Operation canceled due to new request.');
		}
		//Save the cancel token for the current request
		cancelToken = axios.CancelToken.source();
		return client
			.get('/realms/' + realm + '/users', {
				params: {
					mail,
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
				cancelToken: cancelToken.token,
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data);
	});

export const getUser = (token?: string) => async (
	realm: string,
	id: string,
): Promise<User> => {
	const result = await getClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/users/' + id, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);
	return result;
};

export const deleteUser = (token?: string) => (realm: string, id: string) =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + realm + '/users/' + id, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const postUser = (token?: string) => (realm: string, user: User) =>
	getClient().then((client: AxiosInstance) =>
		client
			.post('/realms/' + realm + '/users', user, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const updateUser = (token?: string) => (
	realm: string,
	id: string,
	user: User,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.put('/realms/' + realm + '/users/' + id, user, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const getUsersFromUserStorage = (token?: string) => (
	realm: string,
	us: string,
	{
		mail,
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
	getClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/storages/' + us + '/users', {
				params: {
					mail,
					identifiant,
					nomCommun,
					description,
					organisationId,
					size: size ? size : 500,
					start,
					searchCookie,
					typeRecherche,
					habilitations,
					application,
				},
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const getUserFromUserStorage = (token?: string) => async (
	realm: string,
	us: string,
	id: string,
): Promise<User> => {
	const result = await getClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' + realm + '/storages/' + us + '/users/' + id,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);
	return result;
};

export const deleteUserFromUserStorage = (token?: string) => (
	realm: string,
	us: string,
	id: string,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' + realm + '/storages/' + us + '/users/' + id,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const postUserFromUserStorage = (token?: string) => (
	realm: string,
	us: string,
	user: User,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' + realm + '/storages/' + us + '/users',
				user,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const updateUserFromUserStorage = (token?: string) => (
	realm: string,
	us: string,
	id: string,
	user: User,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' + realm + '/storages/' + us + '/users/' + id,
				user,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);
