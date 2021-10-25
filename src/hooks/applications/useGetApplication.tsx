import { useEffect, useState } from 'react';
import { getApplication } from '../../api/remote';
import Application from '../../model/api/application';

export const useGetApplication = (realm?: string, name?: string) => {
	const [result, setResult] = useState<Application | undefined>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [firstSearch, setFirstSearch] = useState(
		realm && name ? true : false,
	);

	const execute = async (realm: string, name: string) => {
		setLoading(true);
		setError(undefined);
		await getApplication(realm, name)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			getApplication(realm as string, name)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, name, realm]);

	return { application: result, execute, error, loading };
};
