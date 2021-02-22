import { useEffect, useState } from 'react';
import { postUser } from '../../api';
import User from '../../model/api/user';

const usePostUser = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [todo, setTodo] = useState<any>(undefined);
	const [result, setResult] = useState<User | undefined>(undefined);

	useEffect(() => {
		if (todo) {
			setLoading(true);
			setError(undefined);
			postUser(todo.user, todo.realm, todo.userStorage)
				.then((r: User) => setResult(r))
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (user: User, realm: string, userStorage: string) =>
		setTodo({ realm: realm, user: user, userStorage: userStorage });

	return { execute, user: result, loading, error };
};

export default usePostUser;
