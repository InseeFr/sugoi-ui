import { useState } from 'react';
import { createGroup } from './../../../api';
import { Group } from '../../../model/api/group';
import useAuth from '../../auth/useAuth';

export const useCreateGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Group | undefined>();
	const { access_token } = useAuth();

	const execute = async (
		realm: string,
		application: string,
		group: Group,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await createGroup(access_token)(realm, application, group)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useCreateGroup;
