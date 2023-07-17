import { useEffect, useState } from 'react';
import { getGroups } from '../../api';
import { Group } from '../../model/api/group';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetGroups = (realm?: string, application?: string) => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [firstSearch, setFirstSearch] = useState(
		realm && application ? true : false,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (realm: string, application: string) => {
		setLoading(true);
		setError(undefined);
		await getGroups(realm, application, accessToken)
			.then((r) => setGroups(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			setError(undefined);
			getGroups(realm as string, application as string, accessToken)
				.then((r) => setGroups(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, application, accessToken]);

	return { groups, loading, error, execute };
};
