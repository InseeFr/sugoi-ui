import { useCallback, useEffect, useState } from 'react';
import { getOrganization } from '../../api';
import Organization from '../../model/api/organization';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetOrganization = (
	id: string,
	realm: string,
	userStorage?: string,
) => {
	const [result, setResult] = useState<Organization>();
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (id: string, realm: string, userStorage?: string) => {
			setLoading(true);
			setResult(undefined);
			setError(undefined);
			await getOrganization(id, realm, userStorage, accessToken)
				.then((r: Organization) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => setLoading(false));
		},
		[accessToken],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		execute(id, realm, userStorage);
	}, [execute, id, realm, userStorage]);

	return {
		execute,
		loading,
		organization: result,
		error,
	};
};

export default useGetOrganization;
