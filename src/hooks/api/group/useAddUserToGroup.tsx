import { useState } from 'react';
import useAuth from '../../auth/useAuth';
import { addUserToGroup } from './../../../api';

export const useAddUserToGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();
	const { access_token } = useAuth();

	const execute = async (
		realm: string,
		application: string,
		group: string,
		userId: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await addUserToGroup(access_token)(
			realm,
			application,
			group,
			userId,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useAddUserToGroup;
