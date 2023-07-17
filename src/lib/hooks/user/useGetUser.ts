import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import User from '../../model/api/user';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetUser = (
	id?: string,
	realm?: string,
	userStorage?: string,
) => {
	const [result, setResult] = useState<User | undefined>();
	const [firstSearch, setFirstSearch] = useState(
		id && realm ? true : false,
	);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const accessToken = useOidcAccessToken().accessToken;

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			setError(undefined);
			setResult(undefined);
			getUser(
				id as string,
				realm as string,
				userStorage,
				accessToken,
			)
				.then((r: User) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [id, realm, userStorage, firstSearch, accessToken]);

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
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
	};

	return { execute, loading, user: result, error };
};

export default useGetUser;
