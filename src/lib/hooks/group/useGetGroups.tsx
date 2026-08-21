import { useCallback, useEffect, useState } from 'react';
import { getGroups } from '../../api';
import { Group } from '../../model/api/group';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetGroups = (realm: string, application: string) => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (realm: string, application: string) => {
			setLoading(true);
			setError(undefined);
			await getGroups(realm, application, accessToken)
				.then((r) => setGroups(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
				});
		},
		[accessToken],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		execute(realm, application);
	}, [execute, realm, application]);

	return { groups, loading, error, execute };
};
