import { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import User from '../../model/api/user';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetUser = (id: string, realm: string, userStorage?: string) => {
	const [result, setResult] = useState<User | undefined>();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (id: string, realm: string, userStorage?: string) => {
			setLoading(true);
			setError(undefined);
			setResult(undefined);
			await getUser(id, realm, userStorage, accessToken)
				.then((r: User) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[accessToken],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		execute(id, realm, userStorage);
	}, [execute, id, realm, userStorage]);

	return { execute, loading, user: result, error };
};

export default useGetUser;
