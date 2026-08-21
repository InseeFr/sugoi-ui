import { useCallback, useEffect, useState } from 'react';
import { getApplication } from '../../api/remote';
import Application from '../../model/api/application';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetApplication = (realm?: string, name?: string) => {
	const [result, setResult] = useState<Application | undefined>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (realm: string, name: string) => {
			setLoading(true);
			setError(undefined);
			await getApplication(realm, name, accessToken)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
				});
		},
		[accessToken],
	);

	useEffect(() => {
		if (realm && name) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			execute(realm, name);
		}
	}, [execute, name, realm]);

	return { application: result, execute, error, loading };
};
