import { useState } from 'react';
import { PasswordChangeRequest } from '../../model/api/passwordChangeRequest';
import { sendIdentifiant } from './../../api';

export const useSendIdentifiant = () => {
	const [error, setError] = useState();
	const [result, setResult] = useState<any>();
	const [loading, setLoading] = useState(false);

	const execute = async (
		realm: string,
		userid: string,
		properties?: any,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		await sendIdentifiant(realm, userid, properties, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	return { execute, error, loading, result };
};
