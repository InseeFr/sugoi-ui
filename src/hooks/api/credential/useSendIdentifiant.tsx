import { useState } from 'react';
import { PasswordChangeRequest } from '../../../model/api/passwordChangeRequest';
import useAuth from '../../auth/useAuth';
import { sendIdentifiant } from './../../../api';

export const useSendIdentifiant = () => {
	const [error, setError] = useState();
	const [result, setResult] = useState();
	const [loading, setLoading] = useState(false);
	const { access_token } = useAuth();

	const execute = async (
		realm: string,
		userid: string,
		pcr: PasswordChangeRequest,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		await sendIdentifiant(access_token)(realm, userid, pcr, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	return { execute, error, loading, result };
};
