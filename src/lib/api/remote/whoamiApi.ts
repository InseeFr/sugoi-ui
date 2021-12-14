import { getAuthClient } from '../../configuration/axios-configuration';

export const getWhoami = () =>
	getAuthClient()
		.get('/whoami')
		.then((r) => r.data);
