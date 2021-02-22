import { useEffect, useState } from 'react';
import { deleteUser } from '../../api';

export const useDeleteUser = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(undefined);
	const [data, setdata] = useState<any>(undefined);

	useEffect(() => {
		if (data) {
			setloading(true);
			seterror(undefined);
			deleteUser(data.id, data.realm, data.userStorage)
				.catch((err) => seterror(err))
				.finally(() => {
					setloading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	const execute = (id: string, realm: string, userStorage?: string) =>
		setdata({ id: id, realm: realm, userStorage: userStorage });

	return { loading, error, execute };
};
