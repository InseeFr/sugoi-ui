import { useEffect, useState } from 'react';
import { updateOrganization } from '../../api';
import Organization from '../../model/api/organization';

const useUpdateOrganization = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<any>(undefined);

	const execute = (realm: string, id: string, organization: Organization) =>
		setdata({ realm, id, organization });

	useEffect(() => {
		if (data) {
			setLoading(true);
			updateOrganization(data.realm, data.id, data.organization)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { execute, loading, error };
};

export default useUpdateOrganization;
