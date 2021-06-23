import { useState } from 'react';
import { updateOrganization } from '../../../api';
import Organization from '../../../model/api/organization';

const useUpdateOrganization = () => {
	const [error, setError] = useState();
	const [result, setResult] = useState<Organization | undefined>();
	const [loading, setLoading] = useState(false);

	const execute = async (
		id: string,
		organization: Organization,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateOrganization(id, organization, realm, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateOrganization;
