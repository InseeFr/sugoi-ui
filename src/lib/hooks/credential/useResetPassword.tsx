import { useState } from 'react';
import { TemplateProperties } from '../../model/api/TemplateProperties';
import { resetPassword } from './../../api';
import { useConfig } from './../technics/useConfigFile';

export const useResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [result, setResult] = useState();
	const webhooktag = useConfig('webhooktag');

	const execute = async (
		realm: string,
		userid: string,
		forceResetPwd: boolean,
		templateProperties: TemplateProperties,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		await resetPassword(
			realm,
			userid,
			forceResetPwd,
			templateProperties,
			webhooktag,
			userStorage,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	return { execute, error, result, loading };
};
