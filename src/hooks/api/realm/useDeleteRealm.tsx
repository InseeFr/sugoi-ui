import { useState } from 'react';
import { deleteRealm } from '../../../api';

const useDeleteRealm = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState();

	const execute = async (id: string) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteRealm(id)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteRealm;
