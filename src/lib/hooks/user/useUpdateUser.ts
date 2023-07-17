import { useState } from 'react';
import { updateUser } from '../../api';
import User from '../../model/api/user';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useUpdateUser = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		id: string,
		user: User,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateUser(id, user, realm, userStorage, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateUser;
