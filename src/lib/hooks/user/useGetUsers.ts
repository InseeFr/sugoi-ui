import { useEffect, useState } from 'react';
import { getUsers } from '../../api';
import User from '../../model/api/user';
import searchRequestUser from '../../model/js/searchRequestUser';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetUsers = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<User[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);
	const accessToken = useOidcAccessToken().accessToken;

	useEffect(() => {
		if (firstSearch) {
			getUsers(realm as string, {}, userStorage, accessToken)
				.then((r: any) => {
					setResult(r.results);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, userStorage, accessToken]);

	const execute = async (
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
		}: searchRequestUser,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult([]);
		await getUsers(
			realm,
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
			},
			userStorage,
			accessToken,
		)
			.then((r: any) => {
				setResult(r.results);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, users: result, error };
};

export default useGetUsers;
