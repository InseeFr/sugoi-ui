import { getRegexDomains, isAdministrator } from '../../utils/roles';
import { getRolesFromToken } from '../../utils/token';

const initialRoleState = { auth: undefined };

const userReducer = (state = initialRoleState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'initAuth': {
			nextState = {
				...state,
				auth: {
					...action.payload.auth,
				},
			};
			return nextState;
		}
	}
	return state;
};

export default userReducer;
