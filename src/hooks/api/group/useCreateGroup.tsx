import { useState } from 'react';
import { createGroup } from '../../../api';
import { Group } from '../../../model/api/group';

export const useCreateGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Group | undefined>();

	const execute = async (
		realm: string,
		application: string,
		group: Group,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await createGroup(realm, application, group)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useCreateGroup;
