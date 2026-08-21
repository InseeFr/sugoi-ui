import { useCallback, useEffect, useState } from 'react';
import { getOrganizations } from '../../api';
import Organization from '../../model/api/organization';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetOrganizations = (realm: string, userStorage?: string) => {
	const [result, setResult] = useState<Organization[]>([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = useCallback(
		async (
			realm: string,
			searchRequestOrganization: searchRequestOrganization,
			userStorage?: string,
		) => {
			setLoading(true);
			setResult([]);
			setError(undefined);
			await getOrganizations(
				realm,
				searchRequestOrganization,
				userStorage,
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
		[accessToken],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		execute(realm, {}, userStorage);
	}, [execute, realm, userStorage]);

	return {
		execute,
		loading,
		organizations: result,
		error,
	};
};

export default useGetOrganizations;
