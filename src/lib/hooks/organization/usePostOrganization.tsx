import { useState } from 'react';
import { postOrganization } from '../../api';
import Organization from '../../model/api/organization';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const usePostOrganization = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Organization | undefined>(undefined);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		organization: Organization,
		realm: string,
		userStorage: string,
	) => {
		setLoading(true);
		setResult(undefined);
		setError(undefined);
		return await postOrganization(
			organization,
			realm,
			userStorage,
			accessToken,
		)
			.then((r) => {
				setResult(r);
				return r;
			})
			.catch((err) => {
				setError(err);
				return undefined;
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { organization: result, execute, loading, error };
};

export default usePostOrganization;
