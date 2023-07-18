import { useState } from 'react';
import { addAttribute, deleteAttribute } from '../../api';
import User from '../../model/api/user';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useAddAttribute = (attribute_key: string) => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const attributeKey = useState<string>(attribute_key)[0];
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		id: string,
		attributeValue: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await addAttribute(
			realm,
			id,
			attributeKey,
			attributeValue,
			userStorage,
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

export const useDeleteAttribute = (attribute_key: string) => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const attributeKey = useState<string>(attribute_key)[0];
	const accessToken = useOidcAccessToken().accessToken;

	const execute = async (
		realm: string,
		id: string,
		attributeValue: string,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteAttribute(
			realm,
			id,
			attributeKey,
			attributeValue,
			userStorage,
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
