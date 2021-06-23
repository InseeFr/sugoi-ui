import { useState } from 'react';
import { PasswordChangeRequest } from '../../../model/api/passwordChangeRequest';
import { resetPassword } from './../../../api';

export const useResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [result, setResult] = useState();

	const execute = async (
		realm: string,
		userid: string,
		pcr: PasswordChangeRequest,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		await resetPassword(realm, userid, pcr, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	return { execute, error, result, loading };
};
