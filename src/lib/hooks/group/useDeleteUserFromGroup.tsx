import { useState } from 'react';
import { deleteGroupToUser } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useDeleteUserFromGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		application: string,
		group: string,
		userId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteGroupToUser(
			realm,
			application,
			group,
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

export default useDeleteUserFromGroup;
