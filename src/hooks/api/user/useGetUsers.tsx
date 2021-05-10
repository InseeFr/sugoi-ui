import { useEffect, useState } from 'react';
import User from '../../../model/api/user';
import searchRequestUser from '../../../model/js/searchRequestUser';
import useAuth from '../../auth/useAuth';
import { getUsers } from './../../../api';

const useGetUsers = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<User[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);
	const { access_token } = useAuth();

	useEffect(() => {
		if (firstSearch && access_token) {
			getUsers(access_token)(realm as string, {}, userStorage)
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
	}, [firstSearch, access_token]);

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
		await getUsers(access_token)(
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
