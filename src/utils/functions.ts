import { Realm } from '../model/api/realm';

export const realmHasOrganization: (
	realm: Realm,
	userStorage?: string | undefined,
) => boolean = (realm: Realm, userStorage?: string) => {
	if (userStorage) {
		var usCandidate = realm?.userStorages.filter(
			(us) => us.name === userStorage,
		);
		return (
			realm?.name !== undefined &&
			realm.userStorages.some((us) => us.organizationSource) &&
			usCandidate.length > 0 &&
			usCandidate[0]?.organizationSource !== undefined
		);
	}
	return (
		realm?.name !== undefined &&
		realm?.userStorages !== undefined &&
		realm.userStorages.some((us) => us.organizationSource)
	);
};

export const realmHasApplication = (realm: Realm) => {
	return realm?.name !== undefined && realm?.appSource !== undefined;
};
