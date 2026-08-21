import { useCallback, useEffect, useState } from 'react';
import { getGroup } from '../../api';
import { Group } from '../../model/api/group';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetGroup = (
	realm: string,
	application: string,
	groupId: string,
) => {
	const [group, setGroup] = useState<Group | undefined>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (realm: string, application: string, groupId: string) => {
			setLoading(true);
			setError(undefined);
			await getGroup(realm, application, groupId, accessToken)
				.then((r) => setGroup(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
				});
		},
		[accessToken],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		execute(realm, application, groupId);
	}, [execute, realm, application, groupId]);

	return { group, loading, error, execute };
};
