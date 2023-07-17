import { useState } from 'react';
import { deleteGroup } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useDeleteGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<string | undefined>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		application: string,
		groupId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteGroup(realm, application, groupId, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteGroup;
