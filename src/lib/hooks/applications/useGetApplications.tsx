import { useCallback, useEffect, useState } from 'react';
import { getApplications } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetApplications = (
	realm?: string,
	name?: string,
	cancelable?: boolean,
) => {
	const [result, setResult] = useState<any[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (
			realm: string,
			name?: string,
			customCancelable?: boolean,
		) => {
			setLoading(true);
			setResult([]);
			setError(undefined);
			await getApplications(
				realm,
				name,
				customCancelable ?? cancelable,
				accessToken,
			)
				.then((r: any) => {
					setResult(r.results);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[cancelable, accessToken],
	);

	useEffect(() => {
		if (realm) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			execute(realm, name, false);
		}
	}, [execute, name, realm]);

	return { applications: result, error, loading, execute };
};
