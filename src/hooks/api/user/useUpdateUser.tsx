import { useState } from 'react';
import { updateUser } from '../../../api';
import User from '../../../model/api/user';

const useUpdateUser = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();

	const execute = async (
		id: string,
		user: User,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateUser(id, user, realm, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateUser;
