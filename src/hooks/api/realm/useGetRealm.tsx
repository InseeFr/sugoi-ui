import { useState, useEffect } from 'react';
import { getRealms } from './../../../api';
import { Realm } from '../../../model/api/realm';
import useAuth from '../../auth/useAuth';

export const useGetRealm = (id?: string) => {
	const [result, setResult] = useState<Realm | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const [firstSearch, setFirstSearch] = useState(id ? true : false);
	const { access_token } = useAuth();

	const execute = async (id: string) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await getRealms(access_token)(id)
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
		if (firstSearch && access_token) {
			setLoading(true);
			setError(undefined);
			setResult(undefined);
			getRealms(access_token)(id)
				.then((r) => {
					setResult(r[0]);
				})
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, id, access_token]);

	return { result, loading, error, execute };
};
