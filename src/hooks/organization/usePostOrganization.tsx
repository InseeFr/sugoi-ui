import { useEffect, useState } from 'react';
import { postOrganization } from '../../api';
import Organization from '../../model/api/organization';

const usePostOrganization = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [todo, setTodo] = useState<any>(undefined);
	const [result, setResult] = useState<Organization | undefined>(undefined);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setError(undefined);
			postOrganization(
				todo.organization,
				todo.realm,
				todo.userStorage,
			)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (
		organization: Organization,
		realm: string,
		userStorage: string,
	) =>
		setTodo({
			realm: realm,
			userStorage: userStorage,
			organization: organization,
		});

	return { organization: result, execute, loading, error };
};

export default usePostOrganization;
