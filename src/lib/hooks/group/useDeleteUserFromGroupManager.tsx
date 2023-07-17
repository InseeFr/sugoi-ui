import { useState } from 'react';
import { deleteUserFromManagerGroup } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useDeleteUserFromGroupManager = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		application: string,
		userId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteUserFromManagerGroup(
			realm,
			application,
			userId,
			accessToken,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteUserFromGroupManager;
