import SearchRequestUser from '../../model/js/searchRequestUser';
import { getAuthClient } from '../../configuration/axios-configuration';

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
