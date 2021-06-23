import { useState } from 'react';
import { addGroupToUser } from '../../../api/remote';

export const useAddUserToGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();

	const execute = async (
		realm: string,
		application: string,
		group: string,
		userId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await addGroupToUser(realm, application, group, userId)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useAddUserToGroup;
