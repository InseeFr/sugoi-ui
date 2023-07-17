import { useEffect, useState } from 'react';
import { getOrganization } from '../../api';
import Organization from '../../model/api/organization';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetOrganization = (
	id?: string,
	realm?: string,
	userStorage?: string,
) => {
	const [result, setResult] = useState<Organization>();
	const [firstSearch, setFirstSearch] = useState<any>(
		id && realm ? true : false,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const accessToken = useOidcAccessToken().accessToken;

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			getOrganization(
				id as string,
				realm as string,
				userStorage,
				accessToken,
			)
				.then((r: Organization) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [id, realm, userStorage, firstSearch, accessToken]);

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
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
	};

	return {
		execute,
		loading,
		organization: result,
		error,
	};
};

export default useGetOrganization;
