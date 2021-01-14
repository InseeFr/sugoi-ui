import { Realm } from '../../model/api/realm';

const get = (data: any) => Promise.resolve(data);

export const getRealms = (id?: string) => {
	return get([{ name: 'toto' }]);
};

export const postRealm = (realm: Realm) => {
	return Promise.resolve(realm);
};

export const deleteRealm = (id?: string) => {
	return Promise.resolve(id);
};

export const updateRealm = (id: string, realm: Realm) => {
	return Promise.resolve(realm);
};
