import { useEffect, useState } from 'react';
import { getApplications } from '../../../api/index';

export const useGetApplications = (realm?: string, name?: string) => {
	const [result, setResult] = useState<any[]>([]);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);

	const execute = async (realm: string, name?: string) => {
		setLoading(true);
		setResult([]);
		setError(undefined);
		await getApplications(realm, name)
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
			getApplications(realm as string, name)
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
	}, [firstSearch, name, realm]);

	return { applications: result, error, loading, execute };
};
