import { useEffect, useState } from 'react';
import { getOrganizations } from '../../api';
import Organization from '../../model/api/organization';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

const useGetOrganizations = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<Organization[]>([]);
	const [todo, setTodo] = useState<any>(
		realm
			? {
					realm: realm,
					userStorage: userStorage,
					searchRequest: {},
			  }
			: undefined,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setResult([]);
			getOrganizations(
				todo.realm,
				todo.searchRequest,
				todo.userStorage,
			)
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
		realm: string,
		{ identifiant }: searchRequestOrganization,
		userStorage?: string,
	) => {
		setTodo({
			realm: realm,
			searchRequest: {
				identifiant,
			},
			userStorage: userStorage,
		});
	};
	return {
		execute,
		loading,
		organizations: result,
		error,
	};
};

export default useGetOrganizations;
