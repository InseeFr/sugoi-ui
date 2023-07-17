import { useState } from 'react';
import { createGroup } from '../../api';
import { Group } from '../../model/api/group';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useCreateGroup = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Group | undefined>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		application: string,
		group: Group,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await createGroup(realm, application, group, accessToken)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useCreateGroup;
