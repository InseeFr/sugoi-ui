import { useEffect, useState } from 'react';
import { getGroups } from '../../api';
import { Group } from '../../model/api/group';

export const useGetGroups = (realm: string, application?: string) => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [todo, setTodo] = useState(
		realm && application ? { realm, application } : undefined,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(undefined);

	const execute = (realm: string, application: string) =>
		setTodo({ realm, application });

	useEffect(() => {
		if (todo) {
			setLoading(true);
			getGroups(todo.realm, todo.application)
				.then((r) => setGroups(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	return { groups, loading, error, execute };
};
