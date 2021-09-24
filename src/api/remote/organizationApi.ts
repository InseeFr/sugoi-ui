import { AxiosResponse } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import Organization from '../../model/api/organization';
import { Pageable } from '../../model/api/pageable';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

export const getOrganizations = (
	realm: string,
	{
		identifiant,
		application,
		role,
		property,
		mail,
	}: searchRequestOrganization,
): Promise<Pageable> =>
	getAuthClient()
		.get('/realms/' + realm + '/organizations', {
			params: {
				identifiant,
				application,
				role,
				property,
				mail,
			},
		})
		.then((r: any) => r.data);

export const getOrganization = async (
	realm: string,
	id: string,
): Promise<Organization> => {
	return await getAuthClient()
		.get('/realms/' + realm + '/organizations/' + id)
		.then((r: any) => r.data);
};

export const deleteOrganization = (
	realm: string,
	id: string,
): Promise<string> =>
	getAuthClient()
		.delete('/realms/' + realm + '/organizations/' + id)
		.then((r: any) => r.data);

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
): Promise<Organization> =>
	getAuthClient()
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
	}: searchRequestOrganization,
): Promise<Pageable> =>
	getAuthClient()
		.get('/realms/' + realm + '/storages/' + us + '/organizations', {
			params: {
				identifiant,
				application,
				role,
				property,
				mail,
			},
		})
		.then((r: any) => r.data);

export const getOrganizationFromUserStorage = async (
	realm: string,
	us: string,
	id: string,
): Promise<Organization> => {
	return await getAuthClient()
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
): Promise<string> =>
	getAuthClient()
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
): Promise<Organization> =>
	getAuthClient()
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
): Promise<Organization> =>
	getAuthClient()
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
) =>
	getAuthClient()
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

export const getGpgKey = (id: string, realm: string, userStorage?: string) =>
	getAuthClient()
		.get(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/organization/' +
				id +
				'/gpg-key',
		)
		.then((r: AxiosResponse) => r.data);

export const deleteGpgKey = (id: string, realm: string, userStorage?: string) =>
	getAuthClient()
		.delete(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/organization/' +
				id +
				'/gpg-key',
		)
		.then((r: AxiosResponse) => r.data);
