import { useState } from 'react';
import { putGpgKey } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useUploadGpgKey = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		id: string,
		realm: string,
		formdata: FormData,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await putGpgKey(id, formdata, realm, userStorage, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUploadGpgKey;
