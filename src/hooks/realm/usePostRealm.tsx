import { useEffect, useState } from 'react';
import { postRealm } from '../../api';
import { Realm } from '../../model/api/realm';

const usePostRealm = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<any>(undefined);

	const execute = (realm: Realm) => setdata({ realm });

	useEffect(() => {
		if (data) {
			setLoading(true);
			postRealm(data.Realm)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { execute, loading, error };
};

export default usePostRealm;
