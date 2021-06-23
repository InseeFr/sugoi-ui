const initialConfigState = {
	theme: window.localStorage.getItem('darkMode') ? 'dark' : 'light',
	notifs: {
		enabled_debug: window.localStorage.getItem('debug-notif-enabled')
			? (window.localStorage.getItem(
					'debug-notif-enabled',
			  ) as string) === 'true'
			: false,
	},
	config: {},
	realms: [],
};

const AppReducer = (state = initialConfigState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'saveConfig':
			nextState = { ...state, config: { ...action.payload } };
			return nextState;
		case 'changeTheme':
			nextState = {
				...state,
				theme: action.payload.nameTheme,
			};
			return nextState;
		case 'saveRealms': {
			nextState = {
				...state,
				realms: action.payload.realms,
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

export default AppReducer;
