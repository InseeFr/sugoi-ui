import { useEffect, useState } from 'react';
import { getUsers } from '../../../api';
import User from '../../../model/api/user';
import searchRequestUser from '../../../model/js/searchRequestUser';
const useGetUsers = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<User[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);

	useEffect(() => {
		if (firstSearch) {
			getUsers(realm as string, {}, userStorage)
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
	}, [firstSearch, realm, userStorage]);

	const execute = async (
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
			userStorage,
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
