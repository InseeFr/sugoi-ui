import { useEffect, useState } from 'react';
import useAuth from '../../auth/useAuth';
import { getApplications } from './../../../api';

export const useGetApplications = (realm?: string, name?: string) => {
	const [result, setResult] = useState<any[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);
	const { access_token } = useAuth();

	const execute = async (realm: string, name?: string) => {
		setLoading(true);
		setResult([]);
		setError(undefined);
		await getApplications(access_token)(realm, name)
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
		if (firstSearch && access_token) {
			setLoading(true);
			getApplications(access_token)(realm as string, name)
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
	}, [firstSearch, name, realm, access_token]);

	return { applications: result, error, loading, execute };
};
