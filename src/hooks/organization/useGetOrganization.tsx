import { useEffect, useState } from 'react';
import { getOrganization } from '../../api';
import Organization from '../../model/api/organization';

const useGetOrganization = (id: string, realm: string) => {
	const [result, setResult] = useState<Organization>();
	const [search, setSearch] = useState({
		OrganizationId: id,
		realmId: realm,
	});
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getOrganization(search.realmId, search.OrganizationId)
			.then((r: Organization[]) => {
				setResult(r[0]);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	}, [id, realm, search]);

	return {
		updateSearchOrganization: setSearch,
		loading,
		organization: result,
		error,
	};
};

export default useGetOrganization;
