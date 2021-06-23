import { useState } from 'react';
import { postRealm } from '../../../api';
import { Realm } from '../../../model/api/realm';

const usePostRealm = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Realm | undefined>();

	const execute = async (realm: Realm) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await postRealm(realm)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default usePostRealm;
