import { getClient } from '../../configuration/axios-configuration';

export const getWhoami = (token?: string) => () =>
	getClient()
		.then((client) =>
			client.get('/whoami', {
				headers: { Authorization: 'bearer ' + token },
			}),
		)
		.then((r) => r.data);
