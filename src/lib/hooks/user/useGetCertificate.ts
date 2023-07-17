import { useState } from 'react';
import { getCertificate } from '../../api';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetCertificate = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		return await getCertificate(id, realm, userStorage, accessToken)
			.then((r) => {
				setResult(r);
				return r;
			})
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useGetCertificate;
