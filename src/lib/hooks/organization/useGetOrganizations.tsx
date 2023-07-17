import { useEffect, useState } from 'react';
import { getOrganizations } from '../../api';
import Organization from '../../model/api/organization';
import searchRequestOrganization from '../../model/js/searchRequestOrganization';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetOrganizations = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<Organization[]>([]);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const accessToken = useOidcAccessToken().accessToken;

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			setResult([]);
			getOrganizations(
				realm as string,
				{},
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
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, userStorage, accessToken]);

	const execute = async (
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
	};

	return {
		execute,
		loading,
		organizations: result,
		error,
	};
};

export default useGetOrganizations;
