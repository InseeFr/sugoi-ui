import { useState } from 'react';
import useAuth from '../../auth/useAuth';
import { deleteUser } from './../../../api';

export const useDeleteUser = () => {
	const [loading, setloading] = useState(false);
	const [error, setError] = useState();
	const [result, setResult] = useState<string | undefined>();
	const { access_token } = useAuth();

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setloading(true);
		setError(undefined);
		setResult(undefined);
		await deleteUser(access_token)(id, realm, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setloading(false);
			});
	};

	return { loading, error, execute, result };
};
