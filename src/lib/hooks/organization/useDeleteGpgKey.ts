import { useState } from 'react';
import { deleteGpgKey } from '../../api/remote';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useDeleteGpgKey = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteGpgKey(id, realm, userStorage, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteGpgKey;
