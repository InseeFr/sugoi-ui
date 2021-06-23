import Application from '../model/api/application';
import { Group } from '../model/api/group';
import Organization from '../model/api/organization';
import { Pageable } from '../model/api/pageable';
import { PasswordChangeRequest } from '../model/api/passwordChangeRequest';
import { Realm } from '../model/api/realm';
import User from '../model/api/user';
import searchRequestOrganization from '../model/js/searchRequestOrganization';
import searchRequestUser from '../model/js/searchRequestUser';
import * as Utils from './../utils/object';
import * as fake from './fake/';
import * as remote from './remote/';

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
	userStorage?: string,
): Promise<Pageable> => {
	searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUsers(realm, searchRequest || {});
	} else {
		return userStorage
			? remote.getUsersFromUserStorage(
					realm,
					userStorage,
					searchRequest || {},
			  )
			: remote.getUsers(realm, searchRequest || {});
	}
};

export const getUser = (
	identifiant: string,
	realm: string,
	userStorage?: string,
): Promise<User> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUser(realm, identifiant);
	} else {
		return userStorage
			? remote.getUserFromUserStorage(
					realm,
					userStorage,
					identifiant,
			  )
			: remote.getUser(realm, identifiant);
	}
};

export const postUser = (
	user: User,
	realm: string,
	userStorage: string,
): Promise<User> => {
	user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postUser(realm, user);
	} else {
		return remote.postUserFromUserStorage(realm, userStorage, user);
	}
};

export const deleteUser = (
	id: string,
	realm: string,
	userStorage?: string,
): Promise<string> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteUser(realm, id);
	} else {
		return userStorage
			? remote.deleteUserFromUserStorage(realm, userStorage, id)
			: remote.deleteUser(realm, id);
	}
};

export const updateUser = (
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
			? remote.updateUserFromUserStorage(
					realm,
					userStorage,
					id,
					user,
			  )
			: remote.updateUser(realm, id, user);
	}
};

// Organization function
export const getOrganizations = (
	realm: string,
	searchRequest?: searchRequestOrganization,
	userStorage?: string,
): Promise<Pageable> => {
	searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganizations(realm, searchRequest || {});
	} else {
		return userStorage
			? remote.getOrganizationsFromUserStorage(
					realm,
					userStorage,
					searchRequest || {},
			  )
			: remote.getOrganizations(realm, searchRequest || {});
	}
};

export const getOrganization = (
	identifiant: string,
	realm: string,
	userStorage?: string,
): Promise<Organization> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganization(realm, identifiant);
	} else {
		return userStorage
			? remote.getOrganizationFromUserStorage(
					realm,
					userStorage,
					identifiant,
			  )
			: remote.getOrganization(realm, identifiant);
	}
};

export const updateOrganization = (
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
			? remote.updateOrganizationFromUserStorage(
					realm,
					userStorage,
					id,
					organization,
			  )
			: remote.updateOrganization(realm, id, organization);
	}
};

export const postOrganization = (
	organization: Organization,
	realm: string,
	userStorage: string,
): Promise<Organization> => {
	organization = Utils.cleanObjectEntries(organization);

	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postOrganization(realm, organization);
	} else {
		return remote.postOrganization(realm, userStorage, organization);
	}
};

export const deleteOrganization = (
	id: string,
	realm: string,
	userStorage?: string,
): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteOrganization(realm, id);
	} else {
		return userStorage
			? remote.deleteOrganizationFromUserStorage(
					realm,
					userStorage,
					id,
			  )
			: remote.deleteOrganization(realm, id);
	}
};
// Group function

export const getGroups = (
	realm: string,
	application: string,
): Promise<Group[]> => {
	return remote.getGroups(realm, application);
};

export const createGroup = (
	realm: string,
	application: string,
	group: Group,
) => {
	return remote.postGroup(realm, application, group);
};

export const deleteGroup = (
	realm: string,
	application: string,
	groupId: string,
) => {
	return remote.deleteGroup(realm, application, groupId);
};

export const updateGroup = (
	realm: string,
	application: string,
	group: Group,
) => {
	return remote.putGroup(realm, application, group);
};

export const addUserToGroup = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
) => {
	return remote.addUserToGroup(realm, application, groupId, userId);
};

export const deleteUserFromGroup = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
) => {
	return remote.deleteUserFromGroup(realm, application, groupId, userId);
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

export const createApplication = (realm: string, app: Application) => {
	return remote.postApplication(realm, app);
};
// Credential Management
export const sendIdentifiant = (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage?: string,
) => {
	return userStorage
		? remote.sendIdentifiantUs(realm, userId, pcr, userStorage)
		: remote.sendIdentifiant(realm, userId, pcr);
};

export const resetPassword = (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage?: string,
): Promise<any> => {
	return userStorage
		? remote.resetPasswordUs(realm, userId, pcr, userStorage)
		: remote.resetPassword(realm, userId, pcr);
};

export const getGroup = (realm: string, application: string, group: string) => {
	return remote.getGroup(realm, application, group);
};

export const deleteApplication = (realm: string, appName: string) => {
	return remote.deleteApplication(realm, appName);
};

export const addAttribute = (
	realm: string,
	user: string,
	attribute_key: string,
	attribute_value: string,
) => {
	return remote.addAttributes(realm, user, attribute_key, attribute_value);
};

export const deleteAttribute = (
	realm: string,
	user: string,
	attribute_key: string,
	attribute_value: string,
) => {
	return remote.deleteAttributes(
		realm,
		user,
		attribute_key,
		attribute_value,
	);
};

export const addGroupToUser = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
) => {
	return remote.addGroupToUser(realm, application, groupId, userId);
};

export const deleteGroupToUser = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
) => {
	return remote.deleteGroupToUser(realm, application, groupId, userId);
};

export const getWhoami = () => {
	return remote.getWhoami();
};
