import { useState } from 'react';
import { updateOrganization } from './../../../api';
import Organization from '../../../model/api/organization';
import useAuth from '../../auth/useAuth';

const useUpdateOrganization = () => {
	const [error, setError] = useState();
	const [result, setResult] = useState<Organization | undefined>();
	const [loading, setLoading] = useState(false);
	const { access_token } = useAuth();

	const execute = async (
		id: string,
		organization: Organization,
		realm: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await updateOrganization(access_token)(
			id,
			organization,
			realm,
			userStorage,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUpdateOrganization;
