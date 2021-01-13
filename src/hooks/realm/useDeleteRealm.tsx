import { useEffect, useState } from 'react';
import { deleteRealm, updateOrganization } from '../../api';
import Organization from '../../model/api/organization';

const useDeleteRealm = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<any>(undefined);

	const execute = (id: string) => setdata({ id });

	useEffect(() => {
		if (data) {
			setLoading(true);
			deleteRealm(data.id)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { execute, loading, error };
};

export default useDeleteRealm;
