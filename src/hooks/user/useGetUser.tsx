import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import User from '../../model/api/user';

const useGetUser = (id?: string, realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<User>({} as User);
	const [todo, setTodo] = useState<any>(
		id && realm
			? { realm: realm, userStorage: userStorage, id: id }
			: undefined,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			getUser(todo.id, todo.realm, todo.userStorage)
				.then((r: User) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [id, realm, todo]);

	const execute = (id: string, realm: string, userStorage?: string) =>
		setTodo({ realm: realm, userStorage: userStorage, id: id });

	return { execute, loading, user: result, error };
};

export default useGetUser;
