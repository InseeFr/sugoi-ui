import { useEffect, useState } from 'react';
import { getOrganization } from '../../api';
import Organization from '../../model/api/organization';

const useGetOrganization = (
	id?: string,
	realm?: string,
	userStorage?: string,
) => {
	const [result, setResult] = useState<Organization>();
	const [todo, setTodo] = useState<any>({
		realm: realm,
		userStorage: userStorage,
		id: id,
	});
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (todo) {
			getOrganization(todo.id, todo.realm, todo.userStorage)
				.then((r: Organization) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => setLoading(false));
		}
	}, [id, realm, todo]);

	const execute = (id: string, realm: string, userStorage: string) => {
		setTodo({ realm: realm, userStorage: userStorage, id: id });
	};

	return {
		execute,
		loading,
		organization: result,
		error,
	};
};

export default useGetOrganization;
