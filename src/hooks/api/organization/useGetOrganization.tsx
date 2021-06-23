import { useEffect, useState } from 'react';
import { getOrganization } from '../../../api';
import Organization from '../../../model/api/organization';

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

	useEffect(() => {
		if (firstSearch) {
			setLoading(true);
			getOrganization(id as string, realm as string, userStorage)
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
	}, [id, realm, userStorage, firstSearch]);

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setResult(undefined);
		setError(undefined);
		await getOrganization(id, realm, userStorage)
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
