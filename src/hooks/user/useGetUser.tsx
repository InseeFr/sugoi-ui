import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import User from '../../model/api/user';

const useGetUser = (id: string, realm: string) => {
	const [result, setResult] = useState<User>({} as User);
	const [search, setSearch] = useState({ userId: id, realmId: realm });
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getUser(search.realmId, search.userId)
			.then((r: User[]) => {
				setResult(r[0]);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	}, [id, realm, search]);

	return { updateSearchUser: setSearch, loading, user: result, error };
};

export default useGetUser;
