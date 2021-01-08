import React, { useState, useEffect } from 'react';
import { updateUserByIdAndDomain } from '../../api/api';
import User from '../../model/user';
interface execute {
	realm: string;
	user: User;
}
const usePostUser = () => {
	const [postUser, setPostUser] = useState<User | undefined>(undefined);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<execute | undefined>(undefined);
	const execute = (realm: string, user: User) => setdata({ realm, user });
	useEffect(() => {
		if (data) {
			setLoading(true);
			let executed = (data as unknown) as execute;
			console.log(executed);
			// updateUserByIdAndDomain(executed.realm, executed.user)
			// 	.then((r: any) => {
			// 		setResult(r);
			// 	})
			// 	.catch((err) => {
			// 		setError(err);
			// 	})
			// 	.finally(() => setLoading(false));
			setLoading(false);
		}
	}, [data]);

	return { execute, loading, error };
};

export default usePostUser;
