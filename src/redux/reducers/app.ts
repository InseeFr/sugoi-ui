const initialState = {
	config: {},
};

const AppReducer = (state = initialState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'appConfig':
			nextState = { ...state, ...action };
			return nextState;

		default:
			return state;
	}
};

export default AppReducer;
