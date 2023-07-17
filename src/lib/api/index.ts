import Application from '../model/api/application';
import { Group } from '../model/api/group';
import Organization from '../model/api/organization';
import { Pageable } from '../model/api/pageable';
import { Realm } from '../model/api/realm';
import { TemplateProperties } from '../model/api/TemplateProperties';
import User from '../model/api/user';
import searchRequestOrganization from '../model/js/searchRequestOrganization';
import searchRequestUser from '../model/js/searchRequestUser';
import * as fake from './fake';
import * as remote from './remote';

// Realm function
export const getRealms = (
	id?: string,
	accessToken?: string,
): Promise<Realm[]> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getRealms(id);
	} else {
		return remote.getRealms(id, accessToken);
	}
};
export const postRealm = (
	realm: Realm,
	accessToken?: string,
): Promise<Realm> => {
	//realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postRealm(realm);
	} else {
		return remote.postRealm(realm, accessToken);
	}
};
export const deleteRealm = (
	id?: string,
	accessToken?: string,
): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteRealm(id);
	} else {
		return remote.deleteRealm(id, accessToken);
	}
};
export const updateRealm = (
	id: string,
	realm: Realm,
	accessToken?: string,
): Promise<Realm> => {
	//realm = Utils.cleanObjectEntries(realm);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateRealm(id, realm);
	} else {
		return remote.updateRealm(id, realm, accessToken);
	}
};

// User function
export const getUsers = (
	realm: string,
	searchRequest?: searchRequestUser,
	userStorage?: string,
	accessToken?: string,
): Promise<Pageable> => {
	//searchRequest = Utils.cleanObjectEntries(searchRequest);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUsers(realm, searchRequest || {});
	} else {
		return userStorage
			? remote.getUsersFromUserStorage(
					realm,
					userStorage,
					searchRequest || {},
					accessToken,
			  )
			: remote.getUsers(realm, searchRequest || {}, accessToken);
	}
};

export const getUser = (
	identifiant: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
): Promise<User> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getUser(realm, identifiant);
	} else {
		return userStorage
			? remote.getUserFromUserStorage(
					realm,
					userStorage,
					identifiant,
					accessToken,
			  )
			: remote.getUser(realm, identifiant, accessToken);
	}
};

export const postUser = (
	user: User,
	realm: string,
	userStorage: string,
	accessToken?: string,
): Promise<User> => {
	//user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postUser(realm, user);
	} else {
		return remote.postUserFromUserStorage(
			realm,
			userStorage,
			user,
			accessToken,
		);
	}
};

export const deleteUser = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
): Promise<string> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteUser(realm, id);
	} else {
		return userStorage
			? remote.deleteUserFromUserStorage(
					realm,
					userStorage,
					id,
					accessToken,
			  )
			: remote.deleteUser(realm, id, accessToken);
	}
};

export const updateUser = (
	id: string,
	user: User,
	realm: string,
	userStorage?: string,
	accessToken?: string,
): Promise<User> => {
	//user = Utils.cleanObjectEntries(user);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateUser(realm, id, user);
	} else {
		console.log(user);
		return userStorage
			? remote.updateUserFromUserStorage(
					realm,
					userStorage,
					id,
					user,
					accessToken,
			  )
			: remote.updateUser(realm, id, user);
	}
};

// Organization function
export const getOrganizations = (
	realm: string,
	searchRequest?: searchRequestOrganization,
	userStorage?: string,
	accessToken?: string,
): Promise<Pageable> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganizations(realm, searchRequest || {});
	} else {
		return userStorage
			? remote.getOrganizationsFromUserStorage(
					realm,
					userStorage,
					searchRequest || {},
					accessToken,
			  )
			: remote.getOrganizations(
					realm,
					searchRequest || {},
					accessToken,
			  );
	}
};

export const getOrganization = (
	identifiant: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
): Promise<Organization> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.getOrganization(realm, identifiant);
	} else {
		return userStorage
			? remote.getOrganizationFromUserStorage(
					realm,
					userStorage,
					identifiant,
					accessToken,
			  )
			: remote.getOrganization(realm, identifiant, accessToken);
	}
};

export const updateOrganization = (
	id: string,
	organization: Organization,
	realm: string,
	userStorage?: string,
	accessToken?: string,
): Promise<Organization> => {
	//organization = Utils.cleanObjectEntries(organization);
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.updateOrganization(realm, id, organization);
	} else {
		return userStorage
			? remote.updateOrganizationFromUserStorage(
					realm,
					userStorage,
					id,
					organization,
					accessToken,
			  )
			: remote.updateOrganization(
					realm,
					id,
					organization,
					accessToken,
			  );
	}
};

export const postOrganization = (
	organization: Organization,
	realm: string,
	userStorage: string,
	accessToken?: string,
): Promise<Organization> => {
	//organization = Utils.cleanObjectEntries(organization);

	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.postOrganization(realm, organization);
	} else {
		return remote.postOrganization(
			realm,
			userStorage,
			organization,
			accessToken,
		);
	}
};

export const deleteOrganization = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
): Promise<any> => {
	if (process.env.REACT_APP_FAKE_API === 'true') {
		return fake.deleteOrganization(realm, id);
	} else {
		return userStorage
			? remote.deleteOrganizationFromUserStorage(
					realm,
					userStorage,
					id,
					accessToken,
			  )
			: remote.deleteOrganization(realm, id, accessToken);
	}
};
// Group function

export const getGroups = (
	realm: string,
	application: string,
	accessToken?: string,
): Promise<Group[]> => {
	return remote.getGroups(realm, application, accessToken);
};

export const createGroup = (
	realm: string,
	application: string,
	group: Group,
	accessToken?: string,
) => {
	return remote.postGroup(realm, application, group, accessToken);
};

export const deleteGroup = (
	realm: string,
	application: string,
	groupId: string,
	accessToken?: string,
) => {
	return remote.deleteGroup(realm, application, groupId, accessToken);
};

export const updateGroup = (
	realm: string,
	application: string,
	group: Group,
	accessToken?: string,
) => {
	return remote.putGroup(realm, application, group, accessToken);
};

export const addUserToGroup = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
	accessToken?: string,
) => {
	return remote.addUserToGroup(
		realm,
		application,
		groupId,
		userId,
		accessToken,
	);
};

export const deleteUserFromGroup = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
	accessToken?: string,
) => {
	return remote.deleteUserFromGroup(
		realm,
		application,
		groupId,
		userId,
		accessToken,
	);
};

// Application function
export const getApplications = (
	realm: string,
	name?: string,
	cancelable?: boolean,
	accessToken?: string,
): Promise<Pageable> => {
	return remote.getApplications(realm, name, cancelable, accessToken);
};

export const getApplication = (
	realm: string,
	name: string,
	accessToken?: string,
) => {
	return remote.getApplication(realm, name, accessToken);
};

export const putApplication = (
	realm: string,
	app: Application,
	accessToken?: string,
) => {
	return remote.putApplication(realm, app, accessToken);
};

export const createApplication = (
	realm: string,
	app: Application,
	accessToken?: string,
) => {
	return remote.postApplication(realm, app, accessToken);
};
// Credential Management
export const sendIdentifiant = (
	realm: string,
	userId: string,
	properties: any,
	userStorage?: string,
	accessToken?: string,
) => {
	return userStorage
		? remote.sendIdentifiantUs(
				realm,
				userId,
				properties,
				userStorage,
				accessToken,
		  )
		: remote.sendIdentifiant(realm, userId, properties, accessToken);
};

export const resetPassword = (
	realm: string,
	userId: string,
	forceResetPwd: boolean,
	templateProperties: TemplateProperties,
	webhooktag?: string,
	userStorage?: string,
	accessToken?: string,
): Promise<any> => {
	return userStorage
		? remote.resetPasswordUs(
				realm,
				userId,
				forceResetPwd,
				templateProperties,
				webhooktag,
				userStorage,
				accessToken,
		  )
		: remote.resetPassword(
				realm,
				userId,
				forceResetPwd,
				templateProperties,
				webhooktag,
				accessToken,
		  );
};

export const getGroup = (
	realm: string,
	application: string,
	group: string,
	accessToken?: string,
) => {
	return remote.getGroup(realm, application, group, accessToken);
};

export const deleteApplication = (
	realm: string,
	appName: string,
	accessToken?: string,
) => {
	return remote.deleteApplication(realm, appName, accessToken);
};

export const addAttribute = (
	realm: string,
	user: string,
	attribute_key: string,
	attribute_value: string,
	accessToken?: string,
) => {
	return remote.addAttributes(
		realm,
		user,
		attribute_key,
		attribute_value,
		accessToken,
	);
};

export const deleteAttribute = (
	realm: string,
	user: string,
	attribute_key: string,
	attribute_value: string,
	accessToken?: string,
) => {
	return remote.deleteAttributes(
		realm,
		user,
		attribute_key,
		attribute_value,
		accessToken,
	);
};

export const addGroupToUser = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
	accessToken?: string,
) => {
	return remote.addGroupToUser(
		realm,
		application,
		groupId,
		userId,
		accessToken,
	);
};

export const deleteGroupToUser = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
	accessToken?: string,
) => {
	return remote.deleteGroupToUser(
		realm,
		application,
		groupId,
		userId,
		accessToken,
	);
};

export const getWhoami = (accessToken?: string): Promise<any> => {
	return remote.getWhoami(accessToken);
};

export const exportUsers = async (
	realm: string,
	searchRequest: searchRequestUser,
	userStorage?: string,
	accessToken?: string,
): Promise<Pageable> => {
	//searchRequest = Utils.cleanObjectEntries(searchRequest);
	return remote.exportUser(
		realm,
		searchRequest || {},
		userStorage,
		accessToken,
	);
};

export const putCertificate = (
	id: string,
	formdata: FormData,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) => {
	return remote.putCertificate(
		id,
		formdata,
		realm,
		userStorage,
		accessToken,
	);
};

export const getCertificate = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) => {
	return remote.getCertificate(id, realm, userStorage, accessToken);
};

export const deleteCertificate = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) => {
	return remote.deleteCertificate(id, realm, userStorage, accessToken);
};

export const putGpgKey = (
	id: string,
	formdata: FormData,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) => {
	return remote.putGpgKey(id, formdata, realm, userStorage, accessToken);
};

export const getGpgKey = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) => {
	return remote.getGpgKey(id, realm, userStorage, accessToken);
};

export const deleteGpgKey = (
	id: string,
	realm: string,
	userStorage?: string,
	accessToken?: string,
) => {
	return remote.deleteGpgKey(id, realm, userStorage, accessToken);
};

export const getManagerGroup = (
	realm: string,
	application: string,
	accessToken?: string,
) => {
	return remote.getManagerGroup(realm, application, accessToken);
};

export const addUserToManagerGroup = (
	realm: string,
	application: string,
	id: string,
	accessToken?: string,
) => {
	return remote.addUserToManagerGroup(realm, application, id, accessToken);
};

export const deleteUserFromManagerGroup = (
	realm: string,
	application: string,
	id: string,
	accessToken?: string,
) => {
	return remote.deleteUserFromManagerGroup(
		realm,
		application,
		id,
		accessToken,
	);
};
