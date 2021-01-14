import { useEffect, useState } from 'react';
import { getOrganization } from '../../api';
import Organization from '../../model/api/organization';

const useGetOrganization = (realm: string, id: string) => {
	const [result, setResult] = useState<Organization>();
	const [search, setSearch] = useState({
		realm: realm,
		id: id,
	});
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (search) {
			getOrganization(search.realm, search.id)
				.then((r: Organization) => {
					setResult(r);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => setLoading(false));
		}
	}, [id, realm, search]);

	const execute = (realm: string, id: string) => {
		setSearch({ realm: realm, id: id });
	};

	return {
		execute,
		loading,
		organization: result,
		error,
	};
};

export default useGetOrganization;
