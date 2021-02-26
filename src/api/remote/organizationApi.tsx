import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import Organization from '../../model/api/organization';
import { Pageable } from '../../model/api/pageable';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

export const getOrganizations = (
	realm: string,
	{ identifiant, application, role, property }: searchRequestOrganization,
): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/organizations', {
				params: { identifiant, application, role, property },
			})
			.then((r: any) => r.data),
	);

export const getOrganization = async (
	realm: string,
	id: string,
): Promise<Organization> => {
	const pageable: Pageable = await getAuthClient().then(
		(client: AxiosInstance) =>
			client
				.get('/' + realm + '/organizations', {
					params: {
						identifiant: id,
					},
				})
				.then((r: any) => r.data),
	);
	return pageable.results[0];
};

export const deleteOrganization = (
	realm: string,
	id: string,
): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/' + realm + '/organizations/' + id)
			.then((r: any) => r.data),
	);

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
): Promise<Organization> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/' + realm + '/organizations/' + id, organization)
			.then((r: any) => r.data),
	);

export const getOrganizationsFromUserStorage = (
	realm: string,
	us: string,
	{ identifiant, application, role, property }: searchRequestOrganization,
): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/' + us + '/organizations', {
				params: { identifiant, application, role, property },
			})
			.then((r: any) => r.data),
	);

export const getOrganizationFromUserStorage = async (
	realm: string,
	us: string,
	id: string,
): Promise<Organization> => {
	const pageable: Pageable = await getAuthClient().then(
		(client: AxiosInstance) =>
			client
				.get('/' + realm + '/' + us + '/organizations', {
					params: {
						identifiant: id,
					},
				})
				.then((r: any) => r.data),
	);
	return pageable.results[0];
};

export const deleteOrganizationFromUserStorage = (
	realm: string,
	us: string,
	id: string,
): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/' + realm + '/' + us + '/organizations/' + id)
			.then((r: any) => r.data),
	);

export const postOrganization = (
	realm: string,
	us: string,
	organization: Organization,
): Promise<Organization> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/' + realm + '/' + us + '/organizations', organization)
			.then((r: any) => r.data),
	);

export const updateOrganizationFromUserStorage = (
	realm: string,
	us: string,
	id: string,
	organization: Organization,
): Promise<Organization> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put(
				'/' + realm + '/' + us + '/organizations/' + id,
				organization,
			)
			.then((r: any) => r.data),
	);
