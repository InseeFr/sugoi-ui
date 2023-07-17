import { AxiosResponse } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import Organization from '../../model/api/organization';
import { Pageable } from '../../model/api/pageable';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';
import axios, { CancelTokenSource } from 'axios';

let cancelToken: CancelTokenSource | undefined = undefined;

export const getOrganizations = (
	realm: string,
	{
		identifiant,
		application,
		role,
		property,
		mail,
		typeRecherche,
	}: searchRequestOrganization,
	accessToken?: string,
): Promise<Pageable> => {
	//Check if there are any previous pending requests
	if (typeof cancelToken != typeof undefined) {
		cancelToken?.cancel('Operation canceled due to new request.');
	}
	//Save the cancel token for the current request
	cancelToken = axios.CancelToken.source();
	return getAuthClient(accessToken)
		.get('/realms/' + realm + '/organizations', {
			params: {
				identifiant,
				application,
				role,
				property,
				mail,
				typeRecherche,
			},
			cancelToken: cancelToken.token,
		})
		.then((r: any) => r.data);
};

export const getOrganization = async (
	realm: string,
	id: string,
	accessToken?: string,
): Promise<Organization> => {
	return await getAuthClient(accessToken)
		.get('/realms/' + realm + '/organizations/' + id)
		.then((r: any) => r.data);
};

export const deleteOrganization = (
	realm: string,
	id: string,
	accessToken?: string,
): Promise<string> =>
	getAuthClient(accessToken)
		.delete('/realms/' + realm + '/organizations/' + id)
		.then((r: any) => r.data);

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
	accessToken?: string,
): Promise<Organization> =>
	getAuthClient(accessToken)
		.put('/realms/' + realm + '/organizations/' + id, organization)
		.then((r: any) => r.data);

export const getOrganizationsFromUserStorage = (
	realm: string,
	us: string,
	{
		identifiant,
		application,
		role,
		property,
		mail,
		typeRecherche,
	}: searchRequestOrganization,
	accessToken?: string,
): Promise<Pageable> =>
	getAuthClient(accessToken)
		.get('/realms/' + realm + '/storages/' + us + '/organizations', {
			params: {
				identifiant,
				application,
				role,
				property,
				mail,
				typeRecherche,
			},
		})
		.then((r: any) => r.data);

export const getOrganizationFromUserStorage = async (
	realm: string,
	us: string,
	id: string,
	accessToken?: string,
): Promise<Organization> => {
	return await getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				'/storages/' +
				us +
				'/organizations/' +
				id,
		)
		.then((r: any) => r.data);
};

export const deleteOrganizationFromUserStorage = (
	realm: string,
	us: string,
	id: string,
	accessToken?: string,
): Promise<string> =>
	getAuthClient(accessToken)
		.delete(
			'/realms/' +
				realm +
				'/storages/' +
				us +
				'/organizations/' +
				id,
		)
		.then((r: any) => r.data);

export const postOrganization = (
	realm: string,
	us: string,
	organization: Organization,
	accessToken?: string,
): Promise<Organization> =>
	getAuthClient(accessToken)
		.post(
			'/realms/' + realm + '/storages/' + us + '/organizations',
			organization,
		)
		.then((r: any) => r.data);

export const updateOrganizationFromUserStorage = (
	realm: string,
	us: string,
	id: string,
	organization: Organization,
	accessToken?: string,
): Promise<Organization> =>
	getAuthClient(accessToken)
		.put(
			'/realms/' +
				realm +
				'/storages/' +
				us +
				'/organizations/' +
				id,
			organization,
		)
		.then((r: any) => r.data);

export const putGpgKey = (
	id: string,
	formdata: FormData,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) =>
	getAuthClient(accessToken)
		.put(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/organization/' +
				id +
				'/gpg-key',
			formdata,
		)
		.then((r: AxiosResponse) => r.data);

export const getGpgKey = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) =>
	getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/organization/' +
				id +
				'/gpg-key',
		)
		.then((r: AxiosResponse) => r.data);

export const deleteGpgKey = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) =>
	getAuthClient(accessToken)
		.delete(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/organization/' +
				id +
				'/gpg-key',
		)
		.then((r: AxiosResponse) => r.data);
