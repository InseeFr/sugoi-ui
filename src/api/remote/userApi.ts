import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Pageable } from '../../model/api/pageable';
import User from '../../model/api/user';
import SearchRequestUser from '../../model/js/searchRequestUser';
import axios from 'axios';

//cancel previous request if new one is send before receive previous request
let cancelToken: any = undefined;

export const getUsers = (
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
		habilitation,
		application,
	}: SearchRequestUser,
): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) => {
		//Check if there are any previous pending requests
		if (typeof cancelToken != typeof undefined) {
			cancelToken.cancel('Operation canceled due to new request.');
		}
		console.log(cancelToken);
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
					habilitation,
					application,
				},
				cancelToken: cancelToken.token,
			})
			.then((r: any) => r.data);
	});

export const getUser = async (realm: string, id: string): Promise<User> => {
	const result = await getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/users/' + id)
			.then((r: any) => r.data),
	);
	return result;
};

export const deleteUser = (realm: string, id: string) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + realm + '/users/' + id)
			.then((r: any) => r.data),
	);

export const postUser = (realm: string, user: User) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/realms/' + realm + '/users', user)
			.then((r: any) => r.data),
	);

export const updateUser = (realm: string, id: string, user: User) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/realms/' + realm + '/users/' + id, user)
			.then((r: any) => r.data),
	);

export const getUsersFromUserStorage = (
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
		habilitation,
		application,
	}: SearchRequestUser,
): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) =>
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
					habilitation,
					application,
				},
			})
			.then((r: any) => r.data),
	);

export const getUserFromUserStorage = async (
	realm: string,
	us: string,
	id: string,
): Promise<User> => {
	const result = await getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/storages/' + us + '/users/' + id)
			.then((r: any) => r.data),
	);
	return result;
};

export const deleteUserFromUserStorage = (
	realm: string,
	us: string,
	id: string,
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' + realm + '/storages/' + us + '/users/' + id,
			)
			.then((r: any) => r.data),
	);

export const postUserFromUserStorage = (
	realm: string,
	us: string,
	user: User,
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/realms/' + realm + '/storages/' + us + '/users', user)
			.then((r: any) => r.data),
	);

export const updateUserFromUserStorage = (
	realm: string,
	us: string,
	id: string,
	user: User,
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' + realm + '/storages/' + us + '/users/' + id,
				user,
			)
			.then((r: any) => r.data),
	);

export const addGroupToUser = (
	realm: string,
	application_id: string,
	group_id: string,
	id: string,
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' +
					realm +
					'/applications/' +
					application_id +
					'/groups/' +
					group_id +
					'/members/' +
					id,
			)
			.then((r: any) => r.data),
	);

export const deleteGroupToUser = (
	realm: string,
	application_id: string,
	group_id: string,
	id: string,
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' +
					realm +
					'/applications/' +
					application_id +
					'/groups/' +
					group_id +
					'/members/' +
					id,
			)
			.then((r: any) => r.data),
	);
