import { useState, useEffect } from 'react';
import { getRealms } from './../../../api';
import { Realm } from '../../../model/api/realm';
import useAuth from '../../auth/useAuth';

export const useGetRealms = () => {
	const [result, setResult] = useState<Realm[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const { access_token } = useAuth();

	useEffect(() => {
		if (access_token) {
			setLoading(true);
			getRealms(access_token)()
				.then((r) => {
					setLoading(true);
					setResult(r);
				})
				.catch((err) => setError(err))
				.finally(() => setLoading(false));
		}
	}, [access_token]);

	const execute = async () => {
		setLoading(true);
		setError(undefined);
		setResult([]);
		await getRealms(access_token)()
			.then((r) => {
				setLoading(true);
				setResult(r);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};
	return { result, execute, loading, error };
};
