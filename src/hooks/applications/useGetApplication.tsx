import { useEffect, useState } from 'react';
import { getApplication } from '../../api/remote';

export const useGetApplication = (realm: string, name: string) => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [todo, setTodo] = useState<any>({ realm: realm, name: name });

	useEffect(() => {
		if (todo) {
			getApplication(todo.realm, todo.name)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
				});
		}
	}, [todo]);

	const execute = (realm: string, name: string) => {
		setTodo({ realm: realm, name: name });
	};

	return { application: result, execute, error, loading };
};
