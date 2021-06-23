import { useEffect, useState } from 'react';
import { getUser } from '../../../api';
import User from '../../../model/api/user';

const useGetUser = (id?: string, realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<User | undefined>();
	const [firstSearch, setFirstSearch] = useState(
		id && realm ? true : false,
	);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			setError(undefined);
			setResult(undefined);
			getUser(id as string, realm as string, userStorage)
				.then((r: User) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [id, realm, userStorage, firstSearch]);

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await getUser(id, realm, userStorage)
			.then((r: User) => {
				setResult(r);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, user: result, error };
};

export default useGetUser;
