import { useEffect, useState } from 'react';
import { getApplications } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetApplications = (
	realm?: string,
	name?: string,
	cancelable?: boolean,
) => {
	const [result, setResult] = useState<any[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (realm: string, name?: string) => {
		setLoading(true);
		setResult([]);
		setError(undefined);
		await getApplications(realm, name, cancelable, accessToken)
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

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			getApplications(realm as string, name, undefined, accessToken)
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
	}, [firstSearch, name, realm, accessToken]);

	return { applications: result, error, loading, execute };
};
