import { useState } from 'react';
import { putGpgKey } from '../../api/';

const useUploadGpgKey = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>();

	const execute = async (
		id: string,
		realm: string,
		formdata: FormData,
		userStorage?: string,
	) => {
		setLoading(true);
		setError(undefined);
		setResult(undefined);
		await putGpgKey(id, formdata, realm, userStorage)
			.then((r) => setResult(r))
			.catch((err) => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return { execute, loading, error, result };
};

export default useUploadGpgKey;
