import { useState } from 'react';
import { deleteRealm } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useDeleteRealm = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (id: string) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteRealm(id, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteRealm;
