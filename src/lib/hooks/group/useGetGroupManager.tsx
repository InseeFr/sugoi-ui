import { useEffect, useState } from 'react';
import { getManagerGroup } from '../../api';
import { Group } from '../../model/api/group';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetGroupManager = (realm?: string, application?: string) => {
	const [group, setGroup] = useState<Group>();
	const [firstSearch, setFirstSearch] = useState(
		realm && application ? true : false,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (realm: string, application: string) => {
		setLoading(true);
		setError(undefined);
		await getManagerGroup(realm, application, accessToken)
			.then((r) => setGroup(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			setError(undefined);
			getManagerGroup(
				realm as string,
				application as string,
				accessToken,
			)
				.then((r) => setGroup(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, application, accessToken]);

	return { group, loading, error, execute };
};

export default useGetGroupManager;
