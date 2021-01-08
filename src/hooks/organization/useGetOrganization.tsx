import { useEffect, useState } from 'react';
import { getUserByIdAndDomain } from '../../api/api';
import Organization from '../../model/organization';

const useGetOrganization = (id: string, realm: string) => {
	const [result, setResult] = useState<Organization>();
	const [search, setSearch] = useState({
		OrganizationId: id,
		realmId: realm,
	});
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUserByIdAndDomain(search.realmId, search.OrganizationId)
			.then((r: any) => {
				setResult(r);
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
