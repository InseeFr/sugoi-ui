import { useState } from 'react';
import { putApplication } from '../../../api';
import Application from '../../../model/api/application';

export const usePutApplication = () => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const execute = async (realm: string, app: Application) => {
		setLoading(true);
		setError(undefined);
		await putApplication(realm, app)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { application: result, execute, error, loading };
};
