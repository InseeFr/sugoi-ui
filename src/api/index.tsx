import Organization from '../model/api/organization';
import { Realm } from '../model/api/realm';
import User from '../model/api/user';
import searchRequestOrganization from '../model/js/searchRequestOrganization';
import searchRequestUser from '../model/js/searchRequestUser';
import * as fake from './fake/';
import * as remote from './remote/';

// Realm function
export const getRealms = (id?: string): Promise<Realm[]> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getRealms(id);
	} else {
		return remote.getRealms(id);
	}
};

// User function
export const getUsers = (
	realm: string,
	searchRequest?: searchRequestUser,
): Promise<User[]> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getUsers(realm, searchRequest || {});
	} else {
		return remote.getUsers(realm, searchRequest || {});
	}
};

export const getUser = (realm: string, identifiant: string) => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getUser(realm, identifiant);
	} else {
		return remote.getUser(realm, identifiant);
	}
};

export const postUser = (realm: string, user: User) => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.postUser(realm, user);
	} else {
		return remote.postUser(realm, user);
	}
};

// Organization function
export const getOrganizations = (
	realm: string,
	searchRequest?: searchRequestOrganization,
): Promise<Organization[]> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getOrganizations(realm, searchRequest || {});
	} else {
		return remote.getOrganizations(realm, searchRequest || {});
	}
};

export const getOrganization = (
	realm: string,
	identifiant: string,
): Promise<Organization[]> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getOrganization(realm, identifiant);
	} else {
		return remote.getOrganization(realm, identifiant);
	}
};
// Group function
