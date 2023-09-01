import { useState } from 'react';
import { addGroupToUser, deleteGroupToUser } from '../../api/remote';
import User from '../../model/api/user';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useAddGroupsToUser = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		application_id: string,
		group_id: string,
		id: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await addGroupToUser(
			realm,
			application_id,
			group_id,
			id,
			accessToken,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export const useDeleteGroupsToUser = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		application_id: string,
		group_id: string,
		id: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteGroupToUser(
			realm,
			application_id,
			group_id,
			id,
			accessToken,
		)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};
