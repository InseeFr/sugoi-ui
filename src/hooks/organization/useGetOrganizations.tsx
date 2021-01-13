import { useEffect, useState } from 'react';
import { getOrganizations } from '../../api';
import Organization from '../../model/api/organization';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

const useGetOrganizations = (realm?: string) => {
	const [result, setResult] = useState<Organization>();
	const [todo, setTodo] = useState<any>(
		realm ? { realm: realm, searchRequest: {} } : undefined,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (todo) {
			getOrganizations(todo.realm, todo.searchRequest)
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
	) => {
		setTodo({
			realm: realm,
			searchRequest: {
				identifiant,
			},
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
