import { useEffect, useState } from 'react';
import { updateUser } from '../../api';
import User from '../../model/api/user';

const useUpdateUser = () => {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [data, setdata] = useState<any>(undefined);

	const execute = (realm: string, id: string, user: User) =>
		setdata({ realm, id, user });

	useEffect(() => {
		if (data) {
			setLoading(true);
			setError(undefined);
			updateUser(data.realm, data.id, data.user)
				.catch((err) => setError(err))
				.finally(() => {
					setLoading(false);
					setdata(undefined);
				});
		}
	}, [data]);

	return { execute, loading, error };
};

export default useUpdateUser;
