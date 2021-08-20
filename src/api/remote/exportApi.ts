import SearchRequestUser from '../../model/js/searchRequestUser';
import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';

export const exportUser = async (
	realm: string,
	{
		mail,
		identifiant,
		nomCommun,
		description,
		organisationId,
		size,
		start,
		searchCookie,
		typeRecherche,
		habilitations,
		application,
	}: SearchRequestUser,
	userStorage?: string,
): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) => {
		return client
			.get(
				'/realms/' +
					realm +
					(userStorage ? '/storages/' + userStorage : '') +
					'/export/users/export.csv',
				{
					params: {
						mail,
						identifiant,
						nomCommun,
						description,
						organisationId,
						size,
						start,
						searchCookie,
						typeRecherche,
						habilitations,
						application,
					},
				},
			)
			.then((r: any) => r.data);
	});
