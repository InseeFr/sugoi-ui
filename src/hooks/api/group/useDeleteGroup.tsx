import { useState } from 'react';
import { deleteGroup } from '../../../api';

export const useDeleteGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<string | undefined>();

	const execute = async (
		realm: string,
		application: string,
		groupId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteGroup(realm, application, groupId)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useDeleteGroup;
