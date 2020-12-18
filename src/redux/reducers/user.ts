import { isAdministrator, isReader, isWriter } from '../../utils/roles';
import { getRolesFromToken } from '../../utils/token';

const initialRoleState = {};

const userReducer = (state = initialRoleState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'loadUser':
			let reader = isReader(
				getRolesFromToken(action.payload.user.access_token),
				action.payload.config.readerRegexName,
			);
			let writer = isWriter(
				getRolesFromToken(action.payload.user.access_token),
				action.payload.config.writerRegexName,
			);
			let admin = isAdministrator(
				getRolesFromToken(action.payload.user.access_token),
				action.payload.config.adminName,
			);
			nextState = {
				...state,
				...action.payload.user.profile,
				role: {
					isAdmin: admin,
					isReader: reader[0],
					readerDomains: reader[1],
					isWriter: writer[0],
					writerDomains: writer[1],
				},
			};
			return nextState;
	}
	return state;
};

export default userReducer;
