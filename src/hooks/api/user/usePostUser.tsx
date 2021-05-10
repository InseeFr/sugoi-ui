import { useState } from 'react';
import { postUser } from './../../../api';
import User from '../../../model/api/user';
import useAuth from '../../auth/useAuth';

const usePostUser = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>(undefined);
	const { access_token } = useAuth();

	const execute = async (
		user: User,
		realm: string,
		userStorage: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await postUser(access_token)(user, realm, userStorage)
			.then((r: User) => setResult(r))
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, user: result, loading, error };
};

export default usePostUser;
