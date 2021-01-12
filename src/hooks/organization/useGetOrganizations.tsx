import { useEffect, useState } from 'react';
import { getOrganization, getOrganizations } from '../../api';
import Organization from '../../model/api/organization';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';

const useGetOrganizations = () => {
	const [result, setResult] = useState<Organization>();
	const [todo, setTodo] = useState<any>(undefined);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (todo) {
			getOrganizations(todo.realmId)
				.then((r: Organization[]) => {
					setResult(r[0]);
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
		organization: result,
		error,
	};
};

export default useGetOrganizations;
