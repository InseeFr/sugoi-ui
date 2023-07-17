import { useState } from 'react';
import { deleteUser } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useDeleteUser = () => {
	const [loading, setloading] = useState(false);
	const [error, setError] = useState();
	const [result, setResult] = useState<string | undefined>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setloading(true);
		setError(undefined);
		setResult(undefined);
		await deleteUser(id, realm, userStorage, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setloading(false);
			});
	};

	// const execute = (id: string, realm: string, userStorage?: string) =>
	// 	setdata({ id: id, realm: realm, userStorage: userStorage });

	return { loading, error, execute, result };
};
