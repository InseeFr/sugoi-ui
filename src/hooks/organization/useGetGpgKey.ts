import { useState } from 'react';
import { getGpgKey } from '../../api';

export const useGetGpgKey = () => {
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
		return await getGpgKey(id, realm, userStorage)
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

export default useGetGpgKey;
