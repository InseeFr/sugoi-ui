import { useEffect, useState } from 'react';
import { getApplication } from '../../api/remote';
import Application from '../../model/api/application';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetApplication = (realm?: string, name?: string) => {
	const [result, setResult] = useState<Application | undefined>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [firstSearch, setFirstSearch] = useState(
		realm && name ? true : false,
	);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (realm: string, name: string) => {
		setLoading(true);
		setError(undefined);
		await getApplication(realm, name, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			getApplication(realm as string, name, accessToken)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, name, realm, accessToken]);

	return { application: result, execute, error, loading };
};
