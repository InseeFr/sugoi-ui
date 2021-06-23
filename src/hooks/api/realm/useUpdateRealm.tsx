import { useState } from 'react';
import { updateRealm } from '../../../api';
import { Realm } from '../../../model/api/realm';

const useUpdateRealm = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Realm | undefined>();

	const execute = async (id: string, realm: Realm) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateRealm(id, realm)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateRealm;
