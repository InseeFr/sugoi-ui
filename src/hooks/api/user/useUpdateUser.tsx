import { useState } from 'react';
import { updateUser } from './../../../api';
import User from '../../../model/api/user';
import useAuth from '../../auth/useAuth';

const useUpdateUser = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const { access_token } = useAuth();

	const execute = async (
		id: string,
		user: User,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateUser(access_token)(id, user, realm, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateUser;
