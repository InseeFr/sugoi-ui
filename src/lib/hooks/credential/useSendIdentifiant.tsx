import { useState } from 'react';
import { sendIdentifiant } from './../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useSendIdentifiant = () => {
	const [error, setError] = useState();
	const [result, setResult] = useState<any>();
	const [loading, setLoading] = useState(false);
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		userid: string,
		properties?: any,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		await sendIdentifiant(
			realm,
			userid,
			properties,
			userStorage,
			accessToken,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	return { execute, error, loading, result };
};
