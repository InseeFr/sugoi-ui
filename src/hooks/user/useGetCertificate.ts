import { useState } from 'react';
import { getCertificate } from '../../api';

export const useGetCertificate = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		return await getCertificate(id, realm, userStorage)
			.then((r) => {
				console.log(r);
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
