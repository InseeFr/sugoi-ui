import { useCallback, useEffect, useState } from 'react';
import { getManagerGroup } from '../../api';
import { Group } from '../../model/api/group';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetGroupManager = (realm: string, application: string) => {
	const [group, setGroup] = useState<Group>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (realm: string, application: string) => {
			setLoading(true);
			setError(undefined);
			await getManagerGroup(realm, application, accessToken)
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
		execute(realm, application);
	}, [execute, realm, application]);

	return { group, loading, error, execute };
};

export default useGetGroupManager;
