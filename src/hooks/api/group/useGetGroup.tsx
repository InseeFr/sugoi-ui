import { useEffect, useState } from 'react';
import { getGroup } from './../../../api';
import { Group } from '../../../model/api/group';
import useAuth from '../../auth/useAuth';

export const useGetGroup = (
	realm?: string,
	application?: string,
	groupId?: string,
) => {
	const [group, setGroup] = useState<Group | undefined>();
	const [firstSearch, setFirstSearch] = useState(
		realm && application && groupId ? true : false,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const { access_token } = useAuth();

	const execute = async (
		realm: string,
		application: string,
		groupId: string,
	) => {
		setLoading(true);
		setError(undefined);
		await getGroup(access_token)(realm, application, groupId)
			.then((r) => setGroup(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (firstSearch && access_token) {
			setLoading(true);
			setError(undefined);
			getGroup(access_token)(
				realm as string,
				application as string,
				groupId as string,
			)
				.then((r) => setGroup(r))
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, application, access_token]);

	return { group, loading, error, execute };
};
