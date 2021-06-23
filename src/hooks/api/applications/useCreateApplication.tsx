import { useState } from 'react';
import { createApplication } from '../../../api';
import { Application } from '../../../model/api/application';

export const useCreateApplication = () => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const execute = async (realm: string, app: Application) => {
		setLoading(true);
		setError(undefined);
		await createApplication(realm, app)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { application: result, execute, error, loading };
};
