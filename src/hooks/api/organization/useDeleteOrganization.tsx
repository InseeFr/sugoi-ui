import { useState } from 'react';
import { deleteOrganization } from '../../../api';

export const useDeleteOrganization = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState();
	const [result, setResult] = useState();

	const execute = async (
		id: string,
		realm: string,
		userStorage?: string,
	) => {
		setloading(true);
		setResult(undefined);
		seterror(undefined);
		await deleteOrganization(id, realm, userStorage)
			.then((r) => setResult(r))
			.catch((err) => seterror(err))
			.finally(() => {
				setloading(false);
			});
	};

	return { loading, error, execute, result };
};
