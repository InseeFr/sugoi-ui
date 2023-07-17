import { useState } from 'react';
import { postUser } from '../../api';
import User from '../../model/api/user';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const usePostUser = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>(undefined);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		user: User,
		realm: string,
		userStorage: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		return await postUser(user, realm, userStorage, accessToken)
			.then((r: User) => {
				setResult(r);
				return r;
			})
			.catch((err) => {
				setError(err);
				return undefined;
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, user: result, loading, error };
};

export default usePostUser;
