import { useState } from 'react';
import { putApplication } from './../../../api';
import Application from '../../../model/api/application';
import useAuth from '../../auth/useAuth';

export const usePutApplication = () => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const { access_token } = useAuth();

	const execute = async (realm: string, app: Application) => {
		setLoading(true);
		setError(undefined);
		await putApplication(access_token)(realm, app)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { application: result, execute, error, loading };
};
