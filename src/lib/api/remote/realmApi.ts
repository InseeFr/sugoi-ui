import { getAuthClient } from '../../configuration/axios-configuration';
import { Realm } from '../../model/api/realm';

export const getRealms = (id?: string): Promise<Realm[]> =>
	getAuthClient()
		.get('/realms', { params: { id } })
		.then((r: any) => r.data);

export const updateRealm = (id: string, realm: Realm): Promise<Realm> =>
	getAuthClient()
		.put('/realms/' + id, realm)
		.then((r: any) => r.data);

export const deleteRealm = (id?: string): Promise<string> =>
	getAuthClient()
		.delete('/realms/' + id)
		.then((r: any) => r.data);

export const postRealm = (realm: Realm): Promise<Realm> =>
	getAuthClient()
		.post('/realms/', realm)
		.then((r: any) => r.data);
