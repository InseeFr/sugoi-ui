import { getAuthClient } from '../../configuration/axios-configuration';
import { Realm } from '../../model/api/realm';

export const getRealms = (
	id?: string,
	accessToken?: string,
): Promise<Realm[]> =>
	getAuthClient(accessToken)
		.get('/realms', { params: { id } })
		.then((r: any) => r.data);

export const updateRealm = (
	id: string,
	realm: Realm,
	accessToken?: string,
): Promise<Realm> =>
	getAuthClient(accessToken)
		.put('/realms/' + id, realm)
		.then((r: any) => r.data);

export const deleteRealm = (
	id?: string,
	accessToken?: string,
): Promise<string> =>
	getAuthClient(accessToken)
		.delete('/realms/' + id)
		.then((r: any) => r.data);

export const postRealm = (realm: Realm, accessToken?: string): Promise<Realm> =>
	getAuthClient(accessToken)
		.post('/realms/', realm)
		.then((r: any) => r.data);
