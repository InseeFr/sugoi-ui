import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRealms } from 'src/lib/api/index';
import { Realm } from 'src/lib/model/api/realm';
import { UserStorage } from 'src/lib/model/api/userStorage';
import { getCurrentTheme } from 'src/lib/utils/functions';

interface AppState {
	theme: string;
	notifs: any;
	config: any;
	realms?: Realm[];
	realmLoading: boolean;
	realmUsState: RealmUsState;
}

interface RealmUsState {
	shouldUpdateLocation: boolean;
	currentRealm?: Realm;
	currentUs?: UserStorage;
	realmUsPath: string;
}

const initialConfigState: AppState = {
	theme: getCurrentTheme(),
	notifs: {
		enabled_debug: window.localStorage.getItem('debug-notif-enabled')
			? (window.localStorage.getItem(
					'debug-notif-enabled',
			  ) as string) === 'true'
			: false,
	},
	config: {},
	realms: undefined,
	realmLoading: false,
	realmUsState: { shouldUpdateLocation: false, realmUsPath: '/' },
};

const getRealmUsPath = (realm?: string, us?: string) => {
	if (realm) {
		return us ? `/realm/${realm}/us/${us}/` : `/realm/${realm}/`;
	} else return '/';
};

const computeUs = (usName?: string, realm?: Realm) => {
	if (!realm) {
		return undefined;
	} else if (realm.userStorages.length === 1) {
		return realm.userStorages[0];
	} else {
		return realm.userStorages.find((us) => us.name === usName);
	}
};

const computeRealm = (
	previousRealm?: string,
	realmName?: string,
	usName?: string,
	realms?: Realm[],
): RealmUsState => {
	if (!realmName || !realms) {
		return {
			shouldUpdateLocation: false,
			realmUsPath: '/',
		};
	} else {
		let computedRealm;
		if (realms.length === 1) {
			computedRealm = realms[0];
		} else {
			computedRealm = realms.find((r) => r.name === realmName);
		}
		const computedUs = computeUs(usName, computedRealm);
		return {
			currentRealm: computedRealm,
			currentUs: computedUs,
			shouldUpdateLocation:
				!previousRealm || computedRealm?.name !== previousRealm,
			realmUsPath: getRealmUsPath(
				computedRealm?.name,
				computedUs?.name,
			),
		};
	}
};

const AppReducer = (state = initialConfigState, action: PayloadAction<any>) => {
	let nextState: AppState;
	switch (action.type) {
		case 'changeCurrentRealm':
			return {
				...state,
				realmUsState: computeRealm(
					state.realmUsState.currentRealm?.name,
					action.payload.realmName,
					action.payload.usName,
					state.realms,
				),
			};
		case 'saveConfig':
			nextState = { ...state, config: { ...action.payload } };
			return nextState;
		case 'changeTheme':
			nextState = {
				...state,
				theme: action.payload.nameTheme,
			};
			window.localStorage.setItem(
				'theme',
				JSON.stringify(action.payload.nameTheme),
			);
			return nextState;
		case 'getRealms/pending': {
			nextState = {
				...state,
				realmLoading: true,
			};
			return nextState;
		}
		case 'getRealms/fulfilled': {
			nextState = {
				...state,
				realms: action.payload,
				realmLoading: false,
			};
			return nextState;
		}

		case 'changeStatusNotifDebug': {
			nextState = {
				...state,
				notifs: {
					...state.notifs,
					enabled_debug: action.payload.enabled,
				},
			};
			return nextState;
		}
		default:
			return state;
	}
};

export const fetchRealms = createAsyncThunk('getRealms', async () => {
	return await getRealms();
});

export default AppReducer;
