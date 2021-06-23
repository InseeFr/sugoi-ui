import { useState } from 'react';
import { deleteApplication } from '../../../api/remote';

export const useDeleteApplication = () => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const execute = async (realm: string, name: string) => {
		setLoading(true);
		setError(undefined);
		await deleteApplication(realm, name)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { result, execute, error, loading };
};
