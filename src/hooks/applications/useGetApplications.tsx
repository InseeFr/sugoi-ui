import { useEffect, useState } from 'react';
import { getApplications } from '../../api';

export const useGetApplications = (realm?: string, name?: string) => {
	const [result, setResult] = useState<any[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [todo, setTodo] = useState<any>(
		realm ? { realm: realm, name: name } : undefined,
	);
	const execute = (realm?: string, name?: string) => {
		setTodo({ realm: realm, name: name });
	};

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setResult([]);
			getApplications(todo.realm, todo.name)
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

	return { applications: result, error, loading, execute };
};
