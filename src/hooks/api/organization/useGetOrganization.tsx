import { useEffect, useState } from 'react';
import { getOrganization } from './../../../api';
import Organization from '../../../model/api/organization';
import useAuth from '../../auth/useAuth';

const useGetOrganization = (
	id?: string,
	realm?: string,
	userStorage?: string,
) => {
	const [result, setResult] = useState<Organization>();
	const [firstSearch, setFirstSearch] = useState<any>(
		id && realm ? true : false,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const { access_token } = useAuth();

	useEffect(() => {
		if (firstSearch && access_token) {
			setLoading(true);
			getOrganization(access_token)(
				id as string,
				realm as string,
				userStorage,
			)
				.then((r: Organization) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [id, realm, userStorage, firstSearch, access_token]);

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setResult(undefined);
		setError(undefined);
		await getOrganization(access_token)(id, realm, userStorage)
			.then((r: Organization) => {
				setResult(r);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	};

	return {
		execute,
		loading,
		organization: result,
		error,
	};
};

export default useGetOrganization;
