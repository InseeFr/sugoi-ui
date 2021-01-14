import Organization from '../../model/api/organization';
import { Pageable } from '../../model/api/pageable';
import SearchRequestOrganization from '../../model/js/searchRequestOrganization';
import Users from './data/users.json';

export const getOrganizations = (
	realm: string,
	{ identifiant, application, role, property }: SearchRequestOrganization,
): Promise<Pageable> =>
	Promise.resolve({
		results: Users,
		totalElements: 20,
		nextStart: 0,
		hasMoreResult: true,
		pageSize: 20,
	});

export const getOrganization = async (
	realm: string,
	id: string,
): Promise<Organization> => {
	const pageable = await getOrganizations(realm, { identifiant: id });
	return pageable.results[0];
};

export const deleteOrganization = (
	realm: string,
	id: string,
): Promise<string> => Promise.resolve('');

export const postOrganization = (
	realm: string,
	organization: Organization,
): Promise<Organization> => Promise.resolve(organization);

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
): Promise<Organization> => Promise.resolve(organization);
