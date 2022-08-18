import { useState, useEffect } from 'react';
import { getWhoami } from '../../api';
import { Whoami } from '../../model/api/whoami';

export const useWhoAmI = () => {
	const [loading, setLoading] = useState(true);
	const [rights, setRights] = useState<Whoami>();

	useEffect(() => {
		getWhoami()
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
	}, []);

	return { loading, rights };
};
