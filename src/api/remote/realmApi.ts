import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Realm } from '../../model/api/realm';

export const getRealms = (id?: string): Promise<Realm[]> =>
	getAuthClient().then((client: AxiosInstance) =>
		client.get('/realms', { params: { id } }).then((r: any) => r.data),
	);

export const updateRealm = (id: string, realm: Realm): Promise<Realm> =>
	getAuthClient().then((client: AxiosInstance) =>
		client.put('/realms/' + id, realm).then((r: any) => r.data),
	);

export const deleteRealm = (id?: string): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
		client.delete('/realms/' + id).then((r: any) => r.data),
	);

export const postRealm = (realm: Realm): Promise<Realm> =>
	getAuthClient().then((client: AxiosInstance) =>
		client.post('/realms/', realm).then((r: any) => r.data),
	);
