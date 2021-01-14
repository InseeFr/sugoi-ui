import { useState, useEffect } from 'react';
import { getRealms } from '../../api';
import { Realm } from '../../model/api/realm';

export const useGetRealms = () => {
	const [realms, setRealms] = useState<Realm[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	useEffect(() => {
		getRealms()
			.then((r) => {
				setLoading(true);
				setRealms(r);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, []);
	return { realms, loading, error };
};
