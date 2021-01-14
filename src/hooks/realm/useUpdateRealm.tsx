import { useEffect, useState } from 'react';
import { deleteRealm, updateOrganization, updateRealm } from '../../api';
import Organization from '../../model/api/organization';
import { Realm } from '../../model/api/realm';

const useUpdateRealm = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<any>(undefined);

	const execute = (id: string, realm: Realm) => setdata({ id, realm });

	useEffect(() => {
		if (data) {
			setLoading(true);
			updateRealm(data.id, data.realm)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { execute, loading, error };
};

export default useUpdateRealm;
