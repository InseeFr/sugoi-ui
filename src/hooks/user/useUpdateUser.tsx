import { useEffect, useState } from 'react';
import User from '../../model/api/user';
interface execute {
	realm: string;
	user: User;
}
const useUpdateUser = () => {
	const [updatedUser, setUserUpdated] = useState<User | undefined>(
		undefined,
	);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<execute | undefined>(undefined);
	const execute = (realm: string, user: User) => setdata({ realm, user });
	useEffect(() => {
		if (data) {
			console.log(data);
			// updateUserByIdAndDomain(executed.realm, executed.user)
			// 	.then((r: any) => {
			// 		setResult(r);
			// 	})
			// 	.catch((err) => {
			// 		setError(err);
			// 	})
			// 	.finally(() => setLoading(false));
		}
	}, [data]);

	return { execute, loading, error };
};

export default useUpdateUser;
