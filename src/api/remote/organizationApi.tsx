import { AxiosInstance } from 'axios';
import { getClient } from '../../configuration/axios-configuration';
import Organization from '../../model/api/organization';
import { Pageable } from '../../model/api/pageable';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

export const getOrganizations = (token?: string) => (
	realm: string,
	{
		identifiant,
		application,
		role,
		property,
		mail,
	}: searchRequestOrganization,
): Promise<Pageable> =>
	getClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/organizations', {
				params: {
					identifiant,
					application,
					role,
					property,
					mail,
				},
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const getOrganization = (token?: string) => async (
	realm: string,
	id: string,
): Promise<Organization> => {
	return await getClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/organizations/' + id, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);
};

export const deleteOrganization = (token?: string) => (
	realm: string,
	id: string,
): Promise<string> =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + realm + '/organizations/' + id, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const updateOrganization = (token?: string) => (
	realm: string,
	id: string,
	organization: Organization,
): Promise<Organization> =>
	getClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' + realm + '/organizations/' + id,
				organization,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const getOrganizationsFromUserStorage = (token?: string) => (
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
	getClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' +
					realm +
					'/storages/' +
					us +
					'/organizations',
				{
					params: {
						identifiant,
						application,
						role,
						property,
						mail,
					},
					headers: { Authorization: 'bearer ' + token },
				},
			)
			.then((r: any) => r.data),
	);

export const getOrganizationFromUserStorage = (token?: string) => async (
	realm: string,
	us: string,
	id: string,
): Promise<Organization> => {
	return await getClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' +
					realm +
					'/storages/' +
					us +
					'/organizations/' +
					id,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);
};

export const deleteOrganizationFromUserStorage = (token?: string) => (
	realm: string,
	us: string,
	id: string,
): Promise<string> =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' +
					realm +
					'/storages/' +
					us +
					'/organizations/' +
					id,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const postOrganization = (token?: string) => (
	realm: string,
	us: string,
	organization: Organization,
): Promise<Organization> =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/storages/' +
					us +
					'/organizations',
				organization,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const updateOrganizationFromUserStorage = (token?: string) => (
	realm: string,
	us: string,
	id: string,
	organization: Organization,
): Promise<Organization> =>
	getClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' +
					realm +
					'/storages/' +
					us +
					'/organizations/' +
					id,
				organization,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);
