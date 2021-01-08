import { useEffect, useState } from 'react';
import { getUserByIdAndDomain } from '../../api/api';
import User from '../../model/user';

const useGetUser = (id: string, realm: string) => {
	const [result, setResult] = useState<User>();
	const [search, setSearch] = useState({ userId: id, realmId: realm });
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUserByIdAndDomain(search.realmId, search.userId)
			.then((r: any) => {
				setResult(r);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	}, [id, realm, search]);

	return { updateSearchUser: setSearch, loading, user: result, error };
};

export default useGetUser;
