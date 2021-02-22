import { useEffect, useState } from 'react';
import { updateOrganization } from '../../api';
import Organization from '../../model/api/organization';

const useUpdateOrganization = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [todo, setTodo] = useState<any>(undefined);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setError(undefined);
			updateOrganization(
				todo.id,
				todo.organization,
				todo.realm,
				todo.userStorage,
			)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (
		id: string,
		organization: Organization,
		realm: string,
		userStorage?: string,
	) =>
		setTodo({
			realm: realm,
			userStorage: userStorage,
			id: id,
			organization: organization,
		});

	return { execute, loading, error };
};

export default useUpdateOrganization;
