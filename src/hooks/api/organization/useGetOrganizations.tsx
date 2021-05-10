import { useEffect, useState } from 'react';
import { getOrganizations } from './../../../api';
import Organization from '../../../model/api/organization';
import searchRequestOrganization from '../../../model/js/searchRequestOrganization';
import useAuth from '../../auth/useAuth';

const useGetOrganizations = (realm?: string, userStorage?: string) => {
	const [result, setResult] = useState<Organization[]>([]);
	const [firstSearch, setFirstSearch] = useState<any>(realm ? true : false);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const { access_token } = useAuth();

	useEffect(() => {
		if (firstSearch && access_token) {
			setLoading(true);
			setResult([]);
			getOrganizations(access_token)(
				realm as string,
				{},
				userStorage,
			)
				.then((r: any) => {
					setResult(r.results);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					setFirstSearch(false);
				});
		}
	}, [firstSearch, realm, userStorage, access_token]);

	const execute = async (
		realm: string,
		{ identifiant, mail }: searchRequestOrganization,
		userStorage?: string,
	) => {
		setLoading(true);
		setResult([]);
		setError(undefined);
		await getOrganizations(access_token)(
			realm,
			{ identifiant: identifiant, mail: mail },
			userStorage,
		)
			.then((r: any) => {
				setResult(r.results);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return {
		execute,
		loading,
		organizations: result,
		error,
	};
};

export default useGetOrganizations;
