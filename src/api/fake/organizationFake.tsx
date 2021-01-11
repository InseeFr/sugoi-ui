import Organization from '../../model/api/organization';
import SearchRequestOrganization from '../../model/js/searchRequestOrganization';

export const getOrganizations = (
	realm: string,
	{ identifiant, application, role, property }: SearchRequestOrganization,
): Promise<Organization[]> => Promise.resolve([{}]);

export const getOrganization = (
	realm: string,
	id: string,
): Promise<Organization[]> => getOrganizations(realm, { identifiant: id });

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
