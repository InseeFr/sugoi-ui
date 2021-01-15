import { useEffect, useState } from 'react';
import { postOrganization } from '../../api';
import Organization from '../../model/api/organization';

const usePostOrganization = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [data, setdata] = useState<any>(undefined);
	const [result, setResult] = useState<Organization | undefined>(undefined);
	const execute = (realm: string, organization: Organization) =>
		setdata({ realm, organization });

	useEffect(() => {
		if (data) {
			setLoading(true);
			setError(undefined);
			postOrganization(data.realm, data.organization)
				.then((r) => setResult(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { organization: result, execute, loading, error };
};

export default usePostOrganization;
