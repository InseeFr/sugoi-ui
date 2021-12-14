import { getAuthClient } from '../../configuration/axios-configuration';
import { Pageable } from '../../model/api/pageable';
import User from '../../model/api/user';
import SearchRequestUser from '../../model/js/searchRequestUser';
import axios, { CancelTokenSource } from 'axios';

//cancel previous request if new one is send before receive previous request
let cancelToken: CancelTokenSource | undefined = undefined;

export const getUsers = (
	realm: string,
	{
		mail,
		identifiant,
		CommonName,
		description,
		organisationId,
		size,
		start,
		searchCookie,
		typeRecherche,
		habilitation,
		application,
	}: SearchRequestUser,
): Promise<Pageable> => {
	//Check if there are any previous pending requests
	if (typeof cancelToken != typeof undefined) {
		cancelToken?.cancel('Operation canceled due to new request.');
	}
	//Save the cancel token for the current request
	cancelToken = axios.CancelToken.source();
	return getAuthClient()
		.get('/realms/' + realm + '/users', {
			params: {
				mail,
				identifiant,
				CommonName,
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
};

export const getUser = async (realm: string, id: string): Promise<User> => {
	return await getAuthClient()
		.get('/realms/' + realm + '/users/' + id)
		.then((r: any) => r.data);
};

export const deleteUser = (realm: string, id: string): Promise<any> =>
	getAuthClient()
		.delete('/realms/' + realm + '/users/' + id)
		.then((r) => r.data);

export const postUser = (realm: string, user: User): Promise<any> =>
	getAuthClient()
		.post('/realms/' + realm + '/users', user)
		.then((r: any) => r.data);

export const updateUser = (
	realm: string,
	id: string,
	user: User,
): Promise<any> =>
	getAuthClient()
		.put('/realms/' + realm + '/users/' + id, user)
		.then((r) => r.data);

export const getUsersFromUserStorage = (
	realm: string,
	us: string,
	{
		mail,
		identifiant,
		CommonName,
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
	getAuthClient()
		.get('/realms/' + realm + '/storages/' + us + '/users', {
			params: {
				mail,
				identifiant,
				CommonName,
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
		.then((r: any) => r.data);

export const getUserFromUserStorage = async (
	realm: string,
	us: string,
	id: string,
): Promise<User> => {
	return await getAuthClient()
		.get('/realms/' + realm + '/storages/' + us + '/users/' + id)
		.then((r: any) => r.data);
};

export const deleteUserFromUserStorage = (
	realm: string,
	us: string,
	id: string,
): Promise<any> =>
	getAuthClient()
		.delete('/realms/' + realm + '/storages/' + us + '/users/' + id)
		.then((r) => r.data);

export const postUserFromUserStorage = (
	realm: string,
	us: string,
	user: User,
): Promise<any> =>
	getAuthClient()
		.post('/realms/' + realm + '/storages/' + us + '/users', user)
		.then((r) => r.data);

export const updateUserFromUserStorage = (
	realm: string,
	us: string,
	id: string,
	user: User,
): Promise<any> =>
	getAuthClient()
		.put('/realms/' + realm + '/storages/' + us + '/users/' + id, user)
		.then((r) => r.data);

export const addGroupToUser = (
	realm: string,
	application_id: string,
	group_id: string,
	id: string,
): Promise<any> =>
	getAuthClient()
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
		.then((r: any) => r.data);

export const deleteGroupToUser = (
	realm: string,
	application_id: string,
	group_id: string,
	id: string,
): Promise<any> =>
	getAuthClient()
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
		.then((r: any) => r.data);

export const putCertificate = (
	id: string,
	formdata: FormData,
	realm: string,
	userStorage?: string,
): Promise<any> =>
	getAuthClient()
		.put(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/users/' +
				id +
				'/certificates',
			formdata,
		)
		.then((r: any) => r.data);

export const getCertificate = (
	id: string,
	realm: string,
	userStorage?: string,
): Promise<any> =>
	getAuthClient()
		.get(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/users/' +
				id +
				'/certificates',
		)
		.then((r: any) => r.data);

export const deleteCertificate = (
	id: string,
	realm: string,
	userStorage?: string,
): Promise<any> =>
	getAuthClient()
		.delete(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/users/' +
				id +
				'/certificates',
		)
		.then((r: any) => r.data);
