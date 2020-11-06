const initialState = {
	config: {
		theme: window.localStorage.getItem('darkMode') ? 'dark' : 'light',
	},
};

const AppReducer = (state = initialState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'appConfig':
			nextState = { ...state, ...action };
			return nextState;
		case 'changeTheme':
			nextState = {
				...state,
				config: { theme: action.payload.nameTheme },
			};
			return nextState;
		default:
			return state;
	}
};

export default AppReducer;
