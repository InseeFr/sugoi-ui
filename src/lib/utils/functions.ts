import { Realm } from '../model/api/realm';

export const realmHasOrganization: (
	realm: Realm,
	userStorage?: string | undefined,
) => boolean = (realm: Realm, userStorage?: string) => {
	if (userStorage) {
		const usCandidate = realm?.userStorages.filter(
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
	return (
		realm?.name !== undefined &&
		realm?.appSource !== undefined &&
		realm?.appSource !== null
	);
};

export const getCurrentTheme = () => {
	const theme = window.localStorage.getItem('theme');

	switch (JSON.parse(theme !== null ? theme : '""')) {
		case 'light':
			return 'light';
		case 'dark':
			return 'dark';
		default: {
			return 'light';
		}
	}
};

export const getCurrentRealmFavorite = () => {
	let realmFavorite = window.localStorage.getItem('favoriteRealm');
	realmFavorite = realmFavorite !== null ? realmFavorite : '""';
	return JSON.parse(realmFavorite) === ''
		? undefined
		: JSON.parse(realmFavorite);
};

export const getCurrentUsFavorite = () => {
	let usFavorite = window.localStorage.getItem('favoriteUs');
	usFavorite = usFavorite !== null ? usFavorite : '""';
	return JSON.parse(usFavorite) === '' ? undefined : JSON.parse(usFavorite);
};
