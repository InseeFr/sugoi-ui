interface UserState {
	oidcUser?: any;
	isAuthenticated: boolean;
}

const initialRoleState: UserState = { isAuthenticated: false };

const userReducer = (state = initialRoleState, action: any): UserState => {
	switch (action.type) {
		case 'loadUser': {
			return {
				...state,
				oidcUser: action.payload.user,
				isAuthenticated: action.payload.user !== null,
			};
		}
	}
	return state;
};

export default userReducer;
