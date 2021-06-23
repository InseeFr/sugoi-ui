import { useState, useEffect } from 'react';
import { getRealms } from '../../../api';
import { Realm } from '../../../model/api/realm';

export const useGetRealms = () => {
	const [result, setResult] = useState<Realm[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		getRealms()
			.then((r) => {
				setLoading(true);
				setResult(r);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, []);

	const execute = async () => {
		setLoading(true);
		setError(undefined);
		setResult([]);
		await getRealms()
			.then((r) => {
				setLoading(true);
				setResult(r);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};
	return { result, execute, loading, error };
};
