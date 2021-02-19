import Organization from '../model/api/organization';
import { Pageable } from '../model/api/pageable';
import { Realm } from '../model/api/realm';
import User from '../model/api/user';
import searchRequestOrganization from '../model/js/searchRequestOrganization';
import searchRequestUser from '../model/js/searchRequestUser';
import * as fake from './fake/';
import * as remote from './remote/';
import * as Utils from './../utils/object';
import { Group } from '../model/api/group';
import { PasswordChangeRequest } from '../model/api/passwordChangeRequest';
import Application from '../model/api/application';

// Realm function
export const getRealms = (id?: string): Promise<Realm[]> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getRealms(id);
	} else {
		return remote.getRealms(id);
	}
};
export const postRealm = (realm: Realm): Promise<Realm> => {
	realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postRealm(realm);
	} else {
		return remote.postRealm(realm);
	}
};
export const deleteRealm = (id?: string): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteRealm(id);
	} else {
		return remote.deleteRealm(id);
	}
};
export const updateRealm = (id: string, realm: Realm): Promise<Realm> => {
	realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API === 'true') {
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
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUsers(realm, searchRequest || {});
	} else {
		return remote.getUsers(realm, searchRequest || {});
	}
};

export const getUser = (realm: string, identifiant: string): Promise<User> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUser(realm, identifiant);
	} else {
		return remote.getUser(realm, identifiant);
	}
};

export const postUser = (realm: string, user: User): Promise<User> => {
	user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postUser(realm, user);
	} else {
		return remote.postUser(realm, user);
	}
};

export const deleteUser = (realm: string, id: string): Promise<string> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
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
	if (process.env.REACT_APP_FAKE_API === 'true') {
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
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganizations(realm, searchRequest || {});
	} else {
		return remote.getOrganizations(realm, searchRequest || {});
	}
};

export const getOrganization = (
	realm: string,
	identifiant: string,
): Promise<Organization> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganization(realm, identifiant);
	} else {
		return remote.getOrganization(realm, identifiant);
	}
};

export const updateOrganization = (
	realm: string,
	id: string,
	organization: Organization,
): Promise<Organization> => {
	organization = Utils.cleanObjectEntries(organization);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateOrganization(realm, id, organization);
	} else {
		return remote.updateOrganization(realm, id, organization);
	}
};

export const postOrganization = (
	realm: string,
	organization: Organization,
): Promise<Organization> => {
	organization = Utils.cleanObjectEntries(organization);

	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postOrganization(realm, organization);
	} else {
		return remote.postOrganization(realm, organization);
	}
};

export const deleteOrganization = (realm: string, id: string): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteOrganization(realm, id);
	} else {
		return remote.deleteOrganization(realm, id);
	}
};
// Group function

export const getGroups = (
	realm: string,
	application: string,
): Promise<Group[]> => {
	return remote.getGroups(realm, application);
};

// Application function
export const getApplications = (
	realm: string,
	name?: string,
): Promise<Pageable> => {
	return remote.getApplications(realm, name);
};

export const getApplication = (realm: string, name: string) => {
	return remote.getApplication(realm, name);
};

export const putApplication = (realm: string, app: Application) => {
	return remote.putApplication(realm, app);
};

// Credential Management
export const initPassword = () => {};

export const resetPassword = (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
): Promise<any> => {
	return remote.resetPassword(realm, userId, pcr);
};
