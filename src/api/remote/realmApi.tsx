import { AxiosInstance } from 'axios';
import { getClient } from '../../configuration/axios-configuration';
import { Realm } from '../../model/api/realm';

export const getRealms = (token?: string) => (id?: string): Promise<Realm[]> =>
	getClient().then((client: AxiosInstance) =>
		client
			.get('/realms', {
				params: { id },
				headers: { Authorization: 'Bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const updateRealm = (token?: string) => (
	id: string,
	realm: Realm,
): Promise<Realm> =>
	getClient().then((client: AxiosInstance) =>
		client
			.put('/realms/' + id, realm, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const deleteRealm = (token?: string) => (id?: string): Promise<string> =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + id, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const postRealm = (token?: string) => (realm: Realm): Promise<Realm> =>
	getClient().then((client: AxiosInstance) =>
		client
			.post('/realms/', realm, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);
