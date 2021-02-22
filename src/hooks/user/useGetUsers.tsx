import { useEffect, useState } from 'react';
import { getUsers } from '../../api';
import User from '../../model/api/user';
import searchRequestUser from '../../model/js/searchRequestUser';
const useGetUsers = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<User[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [todo, setTodo] = useState<any>(
		realm
			? {
					realm: realm,
					userStorage: userStorage,
					searchRequest: {},
			  }
			: undefined,
	);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setResult([]);
			getUsers(todo.realm, todo.searchRequest, todo.userStorage)
				.then((r: any) => {
					setResult(r.results);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (
		{
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
		setTodo({
			realm: realm,
			searchRequest: {
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
			userStorage: userStorage,
		});
	};

	return { execute, loading, users: result, error };
};

export default useGetUsers;
