import SearchRequestUser from '../../model/js/searchRequestUser';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from 'src/lib/model/api/group';

export const exportUser = async (
	realm: string,
	{
		mail,
		identifiant,
		commonName,
		lastName,
		firstName,
		description,
		organisationId,
		size,
		start,
		searchCookie,
		typeRecherche,
		habilitation,
		application,
	}: SearchRequestUser,
	userStorage?: string,
	accessToken?: string,
): Promise<any> =>
	getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				(userStorage ? '/storages/' + userStorage : '') +
				'/export/users/export.csv',
			{
				params: {
					mail,
					identifiant,
					commonName,
					lastName,
					firstName,
					description,
					organisationId,
					size,
					start,
					searchCookie,
					typeRecherche,
					habilitation,
					application,
				},
			},
		)
		.then((r: any) => r.data);

export const exportGroupUsers = async (
	realm: string,
	application: string,
	group: Group,
	accessToken?: string,
): Promise<any> =>
	getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/groups/' +
				group.name +
				'/export/export.csv',
		)
		.then((r: any) => r.data);
