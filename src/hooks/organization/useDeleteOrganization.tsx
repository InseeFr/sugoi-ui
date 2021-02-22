import { useEffect, useState } from 'react';
import { deleteOrganization } from '../../api';

export const useDeleteOrganization = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(undefined);
	const [todo, setTodo] = useState<any>(undefined);

	useEffect(() => {
		if (todo) {
			setloading(true);
			seterror(undefined);
			deleteOrganization(todo.id, todo.realm, todo.userStorage)
				.then()
				.catch((err) => seterror(err))
				.finally(() => {
					setloading(false);
					setTodo(undefined);
				});
		}
	}, [todo]);

	const execute = (id: string, realm: string, userStorage?: string) =>
		setTodo({ realm: realm, userStorage: userStorage, id: id });

	return { loading, error, execute };
};
