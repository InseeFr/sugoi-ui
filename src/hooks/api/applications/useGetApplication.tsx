import { useEffect, useState } from 'react';
import useAuth from '../../auth/useAuth';
import { getApplication } from './../../../api';

export const useGetApplication = (realm?: string, name?: string) => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [firstSearch, setFirstSearch] = useState(
		realm && name ? true : false,
	);
	const { access_token } = useAuth();

	const execute = async (realm: string, name: string) => {
		setLoading(true);
		setError(undefined);
		await getApplication(access_token)(realm, name)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch && access_token) {
			setLoading(true);
			getApplication(access_token)(realm as string, name as string)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, name, realm, access_token]);

	return { application: result, execute, error, loading };
};
