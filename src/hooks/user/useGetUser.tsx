import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import User from '../../model/api/user';

const useGetUser = (id?: string, realm?: string) => {
	const [result, setResult] = useState<User>({} as User);
	const [search, setSearch] = useState<any>(
		id && realm ? { realm, id } : undefined,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	const execute = (realm: string, id: string) => setSearch({ realm, id });

	useEffect(() => {
		if (search) {
			setLoading(true);
			getUser(search.realm, search.id)
				.then((r: User) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setSearch(undefined);
				});
		}
	}, [id, realm, search]);

	return { execute, loading, user: result, error };
};

export default useGetUser;
