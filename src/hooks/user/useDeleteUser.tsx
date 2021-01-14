import { useEffect, useState } from 'react';
import { deleteUser } from '../../api';

export const useDeleteUser = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(undefined);
	const [data, setdata] = useState<any>(undefined);

	const execute = (realm: string, id: string) => setdata({ realm, id });

	useEffect(() => {
		if (data) {
			setloading(true);
			deleteUser(data.realm, data.id)
				.catch((err) => seterror(err))
				.finally(() => {
					setloading(false);
					setdata(undefined);
				});
		}
	}, [data]);
	return { loading, error, execute };
};
