import { useState } from 'react';
import { updateOrganization } from '../../api';
import Organization from '../../model/api/organization';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useUpdateOrganization = () => {
	const [error, setError] = useState();
	const [result, setResult] = useState<Organization | undefined>();
	const [loading, setLoading] = useState(false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		id: string,
		organization: Organization,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateOrganization(
			id,
			organization,
			realm,
			userStorage,
			accessToken,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateOrganization;
