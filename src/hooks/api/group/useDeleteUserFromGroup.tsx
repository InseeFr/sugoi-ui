import { useState } from 'react';
import { deleteGroupToUser } from '../../../api';

export const useDeleteUserFromGroup = () => {
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
		await deleteGroupToUser(realm, application, group, userId)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteUserFromGroup;
