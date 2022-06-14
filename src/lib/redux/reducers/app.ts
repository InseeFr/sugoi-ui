import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRealms } from 'src/lib/api/index';
import { Realm } from 'src/lib/model/api/realm';
import {
	getCurrentTheme,
	getCurrentRealmFavorite,
	getCurrentUsFavorite,
} from 'src/lib/utils/functions';

interface AppState {
	theme: string;
	favoriteRealm?: string;
	favoriteUs?: string;
	notifs: any;
	config: any;
	realms?: Realm[];
	realmLoading: boolean;
}

const initialConfigState: AppState = {
	theme: getCurrentTheme(),
	favoriteRealm: getCurrentRealmFavorite(),
	favoriteUs: getCurrentUsFavorite(),
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
};

const AppReducer = (state = initialConfigState, action: any) => {
	let nextState: AppState;
	switch (action.type) {
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
		case 'changeFavoriteRealm':
			nextState = {
				...state,
				favoriteRealm: action.payload.realmName,
				favoriteUs: action.payload.usName,
			};
			action.payload.realmName
				? window.localStorage.setItem(
						'favoriteRealm',
						JSON.stringify(action.payload.realmName),
				  )
				: window.localStorage.removeItem('favoriteRealm');
			action.payload.usName
				? window.localStorage.setItem(
						'favoriteUs',
						JSON.stringify(action.payload.usName),
				  )
				: window.localStorage.removeItem('favoriteUs');
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
