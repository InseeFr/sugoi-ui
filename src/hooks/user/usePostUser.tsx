import React, { useState, useEffect } from 'react';
import { postUser } from '../../api';
import User from '../../model/api/user';
interface execute {
	realm: string;
	user: User;
}
const usePostUser = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<execute | undefined>(undefined);
	const [result, setResult] = useState<User | undefined>(undefined);
	useEffect(() => {
		if (data) {
			setLoading(true);
			postUser(data.realm, data.user)
				.then((r: User) => setResult(r))
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false), setdata(undefined);
				});
		}
	}, [data]);

	const execute = (realm: string, user: User) => setdata({ realm, user });
	return { execute, user: result, loading, error };
};

export default usePostUser;
