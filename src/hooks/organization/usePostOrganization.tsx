import { useEffect, useState } from 'react';
import { postOrganization } from '../../api';
import Organization from '../../model/api/organization';

const usePostOrganization = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<any>(undefined);
	const execute = (realm: string, organization: Organization) =>
		setdata({ realm, organization });

	useEffect(() => {
		if (data) {
			setLoading(true);
			postOrganization(data.realm, data.organization)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { execute, loading, error };
};

export default usePostOrganization;
