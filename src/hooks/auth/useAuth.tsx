import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useEffect, useState } from 'react';
import { getWhoami } from '../../api';
import { Whoami } from '../../model/api/whoami';

const useAuth = (withWhoami: boolean = false) => {
	const [rights, setRights] = useState<Whoami | undefined>();
	const [authenticated, setAuthenticated] = useState(false);

	const [access_token, setAccess_token] = useState<string | undefined>(
		undefined,
	);

	const [name, setName] = useState<string | undefined>();
	const [email, setEmail] = useState<string | undefined>();
	const [loadingRights, setLoadingRights] = useState(true);
	const [loadingOidc, setLoadingOidc] = useState(true);
	const { oidcUser } = useReactOidc();

	useEffect(() => {
		if (oidcUser && withWhoami) {
			getWhoami(oidcUser.access_token)()
				.then((r: Whoami) => setRights(r))
				.catch((r) =>
					setRights({
						appManager: [],
						isAdmin: false,
						passwordRealm: [],
						readerRealm: [],
						writerRealm: [],
						id: '',
					}),
				)
				.finally(() => setLoadingRights(false));
		}
	}, [oidcUser]);

	useEffect(() => {
		if (oidcUser) {
			setAuthenticated(true);
			setAccess_token(oidcUser.access_token);
			setName(oidcUser.profile.name as string);
			setEmail(oidcUser.profile.email as string);
			setLoadingOidc(false);
		}
	}, [oidcUser]);

	return {
		loading: withWhoami ? loadingOidc && loadingRights : loadingOidc,
		access_token,
		name,
		email,
		rights,
		authenticated,
	};
};

export default useAuth;
