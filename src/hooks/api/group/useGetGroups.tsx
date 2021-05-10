import { useEffect, useState } from 'react';
import { getGroups } from './../../../api';
import { Group } from '../../../model/api/group';
import useAuth from '../../auth/useAuth';

export const useGetGroups = (realm?: string, application?: string) => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [firstSearch, setFirstSearch] = useState(
		realm && application ? true : false,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const { access_token } = useAuth();

	const execute = async (realm: string, application: string) => {
		setLoading(true);
		setError(undefined);
		await getGroups(access_token)(realm, application)
			.then((r) => setGroups(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch && access_token) {
			setLoading(true);
			setError(undefined);
			getGroups(access_token)(
				realm as string,
				application as string,
			)
				.then((r) => setGroups(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, application, access_token]);

	return { groups, loading, error, execute };
};
