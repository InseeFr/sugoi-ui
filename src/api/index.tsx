import Organization from '../model/api/organization';
import { Pageable } from '../model/api/pageable';
import { Realm } from '../model/api/realm';
import User from '../model/api/user';
import searchRequestOrganization from '../model/js/searchRequestOrganization';
import searchRequestUser from '../model/js/searchRequestUser';
import * as fake from './fake/';
import * as remote from './remote/';
import * as Utils from './../utils/object';

// Realm function
export const getRealms = (id?: string): Promise<Realm[]> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getRealms(id);
	} else {
		return remote.getRealms(id);
	}
};
export const postRealm = (realm: Realm): Promise<Realm> => {
	realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.postRealm(realm);
	} else {
		return remote.postRealm(realm);
	}
};
export const deleteRealm = (id?: string) => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.deleteRealm(id);
	} else {
		return remote.deleteRealm(id);
	}
};
export const updateRealm = (id: string, realm: Realm): Promise<Realm> => {
	realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.updateRealm(id, realm);
	} else {
		return remote.updateRealm(id, realm);
	}
};

// User function
export const getUsers = (
	realm: string,
	searchRequest?: searchRequestUser,
): Promise<Pageable> => {
	searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getUsers(realm, searchRequest || {});
	} else {
		return remote.getUsers(realm, searchRequest || {});
	}
};

export const getUser = (realm: string, identifiant: string): Promise<User> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getUser(realm, identifiant);
	} else {
		return remote.getUser(realm, identifiant);
	}
};

export const postUser = (realm: string, user: User): Promise<User> => {
	user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.postUser(realm, user);
	} else {
		return remote.postUser(realm, user);
	}
};

export const deleteUser = (realm: string, id: string): Promise<string> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.deleteUser(realm, id);
	} else {
		return remote.deleteUser(realm, id);
	}
};

export const updateUser = (
	realm: string,
	id: string,
	user: User,
): Promise<User> => {
	user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.updateUser(realm, id, user);
	} else {
		return remote.updateUser(realm, id, user);
	}
};

// Organization function
export const getOrganizations = (
	realm: string,
	searchRequest?: searchRequestOrganization,
): Promise<Pageable> => {
	searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getOrganizations(realm, searchRequest || {});
	} else {
		return remote.getOrganizations(realm, searchRequest || {});
	}
};

export const getOrganization = (
	realm: string,
	identifiant: string,
): Promise<Organization> => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.getOrganization(realm, identifiant);
	} else {
		return remote.getOrganization(realm, identifiant);
	}
};

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
) => {
	organization = Utils.cleanObjectEntries(organization);
	if (process.env.REACT_APP_FAKE_API) {
		return fake.updateOrganization(realm, id, organization);
	} else {
		return remote.updateOrganization(realm, id, organization);
	}
};

export const postOrganization = (realm: string, organization: Organization) => {
	organization = Utils.cleanObjectEntries(organization);

	if (process.env.REACT_APP_FAKE_API) {
		return fake.postOrganization(realm, organization);
	} else {
		return remote.postOrganization(realm, organization);
	}
};

export const deleteOrganization = (realm: string, id: string) => {
	if (process.env.REACT_APP_FAKE_API) {
		return fake.deleteOrganization(realm, id);
	} else {
		return remote.deleteOrganization(realm, id);
	}
};
// Group function
