import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import Organization from '../../model/api/organization';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

export const getOrganizations = (
	realm: string,
	{ identifiant, application, role, property }: searchRequestOrganization,
): Promise<Organization[]> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/Organizations', {
				params: { identifiant, application, role, property },
			})
			.then((r: any) => r.data),
	);

export const getOrganization = (
	realm: string,
	id: string,
): Promise<Organization[]> => getOrganizations(realm, { identifiant: id });

export const deleteOrganization = (
	realm: string,
	id: string,
): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/' + realm + '/Organizations/' + id)
			.then((r: any) => r.data),
	);

export const postOrganization = (
	realm: string,
	organization: Organization,
): Promise<Organization> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/' + realm + '/Organizations', {
				data: { ...organization },
			})
			.then((r: any) => r.data),
	);

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
): Promise<Organization> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/' + realm + '/Organizations/' + id, {
				data: { ...organization },
			})
			.then((r: any) => r.data),
	);
