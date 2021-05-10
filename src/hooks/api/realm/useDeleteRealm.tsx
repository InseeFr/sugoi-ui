import { useState } from 'react';
import { deleteRealm } from '../../../api';
import useAuth from '../../auth/useAuth';

const useDeleteRealm = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState();
	const { access_token } = useAuth();

	const execute = async (id: string) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteRealm(access_token)(id)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteRealm;
