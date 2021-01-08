import { useEffect, useState } from 'react';

export const useDeleteUser = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(undefined);
	const [data, setdata] = useState<any>(undefined);
	const execute = (realm: string, userId: string) =>
		setdata({ realm, userId });
	useEffect(() => {
		if (data) {
			setloading(true);
			console.log('suppression' + data);
			setloading(false);
		}
	}, [data]);
	return { loading, error, execute };
};
