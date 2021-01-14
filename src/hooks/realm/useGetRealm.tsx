import { useState, useEffect } from 'react';
import { getRealms } from '../../api';
import { Realm } from '../../model/api/realm';

export const useGetRealm = (id?: string) => {
	const [realm, setRealm] = useState<Realm | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const [data, setdata] = useState(id ? { id } : undefined);

	const execute = (id: string) => setdata({ id });

	useEffect(() => {
		if (data) {
			setLoading(true);
			getRealms()
				.then((r) => {
					setLoading(true);
					setRealm(r[0]);
				})
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, []);

	return { realm, loading, error, execute };
};
