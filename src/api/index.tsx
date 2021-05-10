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
import { Whoami } from '../model/api/whoami';

// Realm function
export const getRealms = (token?: string) => (
	id?: string,
): Promise<Realm[]> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getRealms(id);
	} else {
		return remote.getRealms(token)(id);
	}
};
export const postRealm = (token?: string) => (realm: Realm): Promise<Realm> => {
	realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postRealm(realm);
	} else {
		return remote.postRealm(token)(realm);
	}
};
export const deleteRealm = (token?: string) => (id?: string): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteRealm(id);
	} else {
		return remote.deleteRealm(token)(id);
	}
};
export const updateRealm = (token?: string) => (
	id: string,
	realm: Realm,
): Promise<Realm> => {
	realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateRealm(id, realm);
	} else {
		return remote.updateRealm(token)(id, realm);
	}
};

// User function
export const getUsers = (token?: string) => (
	realm: string,
	searchRequest?: searchRequestUser,
	userStorage?: string,
): Promise<Pageable> => {
	searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUsers(realm, searchRequest || {});
	} else {
		return userStorage
			? remote.getUsersFromUserStorage(token)(
					realm,
					userStorage,
					searchRequest || {},
			  )
			: remote.getUsers(token)(realm, searchRequest || {});
	}
};

export const getUser = (token?: string) => (
	identifiant: string,
	realm: string,
	userStorage?: string,
): Promise<User> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUser(realm, identifiant);
	} else {
		return userStorage
			? remote.getUserFromUserStorage(token)(
					realm,
					userStorage,
					identifiant,
			  )
			: remote.getUser(token)(realm, identifiant);
	}
};

export const postUser = (token?: string) => (
	user: User,
	realm: string,
	userStorage: string,
): Promise<User> => {
	user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postUser(realm, user);
	} else {
		return remote.postUserFromUserStorage(token)(
			realm,
			userStorage,
			user,
		);
	}
};

export const deleteUser = (token?: string) => (
	id: string,
	realm: string,
	userStorage?: string,
): Promise<string> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteUser(realm, id);
	} else {
		return userStorage
			? remote.deleteUserFromUserStorage(token)(
					realm,
					userStorage,
					id,
			  )
			: remote.deleteUser(token)(realm, id);
	}
};

export const updateUser = (token?: string) => (
	id: string,
	user: User,
	realm: string,
	userStorage?: string,
): Promise<User> => {
	user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateUser(realm, id, user);
	} else {
		return userStorage
			? remote.updateUserFromUserStorage(token)(
					realm,
					userStorage,
					id,
					user,
			  )
			: remote.updateUser(token)(realm, id, user);
	}
};

// Organization function
export const getOrganizations = (token?: string) => (
	realm: string,
	searchRequest?: searchRequestOrganization,
	userStorage?: string,
): Promise<Pageable> => {
	searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganizations(realm, searchRequest || {});
	} else {
		return userStorage
			? remote.getOrganizationsFromUserStorage(token)(
					realm,
					userStorage,
					searchRequest || {},
			  )
			: remote.getOrganizations(token)(realm, searchRequest || {});
	}
};

export const getOrganization = (token?: string) => (
	identifiant: string,
	realm: string,
	userStorage?: string,
): Promise<Organization> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganization(realm, identifiant);
	} else {
		return userStorage
			? remote.getOrganizationFromUserStorage(token)(
					realm,
					userStorage,
					identifiant,
			  )
			: remote.getOrganization(token)(realm, identifiant);
	}
};

export const updateOrganization = (token?: string) => (
	id: string,
	organization: Organization,
	realm: string,
	userStorage?: string,
): Promise<Organization> => {
	organization = Utils.cleanObjectEntries(organization);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateOrganization(realm, id, organization);
	} else {
		return userStorage
			? remote.updateOrganizationFromUserStorage(token)(
					realm,
					userStorage,
					id,
					organization,
			  )
			: remote.updateOrganization(token)(realm, id, organization);
	}
};

export const postOrganization = (token?: string) => (
	organization: Organization,
	realm: string,
	userStorage: string,
): Promise<Organization> => {
	organization = Utils.cleanObjectEntries(organization);

	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postOrganization(realm, organization);
	} else {
		return remote.postOrganization(token)(
			realm,
			userStorage,
			organization,
		);
	}
};

export const deleteOrganization = (token?: string) => (
	id: string,
	realm: string,
	userStorage?: string,
): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteOrganization(realm, id);
	} else {
		return userStorage
			? remote.deleteOrganizationFromUserStorage(token)(
					realm,
					userStorage,
					id,
			  )
			: remote.deleteOrganization(token)(realm, id);
	}
};

// Group function
export const getGroups = (token?: string) => (
	realm: string,
	application: string,
): Promise<Group[]> => {
	return remote.getGroups(token)(realm, application);
};

export const createGroup = (token?: string) => (
	realm: string,
	application: string,
	group: Group,
) => {
	return remote.postGroup(token)(realm, application, group);
};

export const deleteGroup = (token?: string) => (
	realm: string,
	application: string,
	groupId: string,
) => {
	return remote.deleteGroup(token)(realm, application, groupId);
};

export const updateGroup = (token?: string) => (
	realm: string,
	application: string,
	group: Group,
) => {
	return remote.putGroup(token)(realm, application, group);
};

export const addUserToGroup = (token?: string) => (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
) => {
	return remote.addUserToGroup(token)(realm, application, groupId, userId);
};

export const deleteUserFromGroup = (token?: string) => (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
) => {
	return remote.deleteUserFromGroup(token)(
		realm,
		application,
		groupId,
		userId,
	);
};

// Application function
export const getApplications = (token?: string) => (
	realm: string,
	name?: string,
): Promise<Pageable> => {
	return remote.getApplications(token)(realm, name);
};

export const getApplication = (token?: string) => (
	realm: string,
	name: string,
) => {
	return remote.getApplication(token)(realm, name);
};

export const putApplication = (token?: string) => (
	realm: string,
	app: Application,
) => {
	return remote.putApplication(token)(realm, app);
};

export const createApplication = (token?: string) => (
	realm: string,
	app: Application,
) => {
	return remote.postApplication(token)(realm, app);
};
// Credential Management
export const sendIdentifiant = (token?: string) => (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage?: string,
) => {
	return userStorage
		? remote.sendIdentifiantUs(token)(realm, userId, pcr, userStorage)
		: remote.sendIdentifiant(token)(realm, userId, pcr);
};

export const resetPassword = (token?: string) => (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage?: string,
): Promise<any> => {
	return userStorage
		? remote.resetPasswordUs(token)(realm, userId, pcr, userStorage)
		: remote.resetPassword(token)(realm, userId, pcr);
};

export const getGroup = (token?: string) => (
	realm: string,
	application: string,
	group: string,
) => {
	return remote.getGroup(token)(realm, application, group);
};

export const deleteApplication = (token?: string) => (
	realm: string,
	appName: string,
) => {
	return remote.deleteApplication(token)(realm, appName);
};

export const getWhoami = (token?: string) => (): Promise<Whoami> => {
	return remote.getWhoami(token)();
};
