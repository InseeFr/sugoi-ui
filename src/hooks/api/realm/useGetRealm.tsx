import { useState, useEffect } from 'react';
import { getRealms } from '../../../api';
import { Realm } from '../../../model/api/realm';

export const useGetRealm = (id?: string) => {
	const [result, setResult] = useState<Realm | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const [firstSearch, setFirstSearch] = useState(id ? true : false);

	const execute = async (id: string) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await getRealms(id)
			.then((r) => {
				setLoading(true);
				setResult(r[0]);
			})
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			setError(undefined);
			setResult(undefined);
			getRealms(id)
				.then((r) => {
					setResult(r[0]);
				})
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, id]);

	return { result, loading, error, execute };
};
