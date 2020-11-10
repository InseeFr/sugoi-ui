import { isAdministrator, isReader, isWriter } from './../../utils/roles';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConfigFile } from '../../configuration/utils';

const initialConfigState = {
	config: {
		theme: window.localStorage.getItem('darkMode') ? 'dark' : 'light',
		api: '',
		adminName: '',
		writerRegexName: '',
		readerRegexName: '',
	},
	realms: [],
};

const initialRoleState = {
	isAdmin: false,
	isReader: false,
	isWriter: false,
};

const AppReducer = (state = initialConfigState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'appConfig':
			nextState = { ...state, ...action };
			return nextState;
		case 'changeTheme':
			nextState = {
				...state,
				config: { ...state, theme: action.payload.nameTheme },
			};
			return nextState;
		case 'saveRealms': {
			nextState = {
				...state,
				realms: action.payload.realms,
			};
			return nextState;
		}
		case 'appConfig/fetchConfig/fulfilled':
			return {
				...state,
				config: action.payload,
			};
		default:
			return state;
	}
};

export function roleReducer(state = initialRoleState, action: any) {
	if (action.type === 'appConfig/tokenChanged') {
		return {
			...state,
			isAdmin: isAdministrator(
				action.payload.config.adminName,
				action.payload.token,
			),
			isReader: isReader(
				action.payload.config.readerRegexName,
				action.payload.token,
			),
			isWriter: isWriter(
				action.payload.config.writerRegexName,
				action.payload.token,
			),
		};
	}
	return state;
}

export const fetchConfig = createAsyncThunk(
	'appConfig/fetchConfig',
	async () => {
		return await getConfigFile();
	},
);

export default AppReducer;
