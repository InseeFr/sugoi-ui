import { useState, useEffect } from 'react';
import { getWhoami } from '../../api';
import { Whoami } from '../../model/api/whoami';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useWhoAmI = () => {
	const [loading, setLoading] = useState(true);
	const [rights, setRights] = useState<Whoami>();
	const accessToken = useOidcAccessToken().accessToken;

	useEffect(() => {
		getWhoami(accessToken)
			.then((r: Whoami) => {
				r.appManager = r.appManager.map((right) =>
					right.replace('*_*\\', ''),
				);

				setRights(r);
			})
			.catch(() =>
				setRights({
					appManager: [],
					isAdmin: false,
					passwordRealm: [],
					readerRealm: [],
					writerRealm: [],
					id: '',
				}),
			)
			.finally(() => setLoading(false));
	}, [accessToken]);

	return { loading, rights };
};
