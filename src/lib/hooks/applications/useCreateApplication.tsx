import { useState } from 'react';
import { createApplication } from '../../api';
import { Application } from '../../model/api/application';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useCreateApplication = () => {
	const [result, setResult] = useState<any>();
	const [error, setError] = useState<any>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (realm: string, app: Application) => {
		setLoading(true);
		setError(undefined);
		await createApplication(realm, app, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { application: result, execute, error, loading };
};
