import { useEffect, useState } from 'react';
import { updateUser } from '../../api';
import User from '../../model/api/user';

const useUpdateUser = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [todo, setTodo] = useState<any>(undefined);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setError(undefined);
			updateUser(todo.id, todo.user, todo.realm, todo.userStorage)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (
		id: string,
		user: User,
		realm: string,
		userStorage?: string,
	) =>
		setTodo({
			realm: realm,
			userStorage: userStorage,
			id: id,
			user: user,
		});

	return { execute, loading, error };
};

export default useUpdateUser;
