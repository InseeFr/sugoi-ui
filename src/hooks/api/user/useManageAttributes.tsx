import { useState } from 'react';
import { addAttribute, deleteAttribute } from '../../../api';
import User from '../../../model/api/user';

export const useAddAttribute = (attribute_key: string) => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<User | undefined>();
	const attributeKey = useState<string>(attribute_key)[0];
	const execute = async (
		realm: string,
		id: string,
		attributeValue: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await addAttribute(realm, id, attributeKey, attributeValue)
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

	const execute = async (
		realm: string,
		id: string,
		attributeValue: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await deleteAttribute(realm, id, attributeKey, attributeValue)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};
