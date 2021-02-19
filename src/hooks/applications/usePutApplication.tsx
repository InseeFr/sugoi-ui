import { useEffect, useState } from 'react';
import { putApplication } from '../../api';
import Application from '../../model/api/application';

export const usePutApplication = () => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [todo, setTodo] = useState<any>(undefined);

	useEffect(() => {
		if (todo) {
			putApplication(todo.realm, todo.application)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (realm: string, app: Application) => {
		setTodo({ realm: realm, application: app });
	};

	return { application: result, execute, error, loading };
};
