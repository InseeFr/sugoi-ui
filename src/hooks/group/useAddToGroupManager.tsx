import { useState } from 'react';
import { addUserToManagerGroup } from '../../api/remote';

export const useAddUserToGroupManager = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();

	const execute = async (
		realm: string,
		application: string,
		userId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await addUserToManagerGroup(realm, application, userId)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useAddUserToGroupManager;
