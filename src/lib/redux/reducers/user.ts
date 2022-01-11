import { getRegexDomains, isAdministrator } from '../../utils/roles';
import { getRolesFromToken } from '../../utils/token';

const initialRoleState = {};

const userReducer = (state = initialRoleState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'loadUser': {
			const readerDomains: string[] = getRegexDomains(
				getRolesFromToken(
					action.payload.user.access_token,
					action.payload.config.auth.json_path_to_roles,
				),
				action.payload.config.readerRegexName,
			);
			const writerDomains: string[] = getRegexDomains(
				getRolesFromToken(
					action.payload.user.access_token,
					action.payload.config.auth.json_path_to_roles,
				),
				action.payload.config.writerRegexName,
			);
			const admin: boolean = isAdministrator(
				getRolesFromToken(
					action.payload.user.access_token,
					action.payload.config.auth.json_path_to_roles,
				),
				action.payload.config.adminName,
			);
			nextState = {
				...state,
				...action.payload.user,
				role: {
					isAdmin: admin,
					isReader: readerDomains.length > 0,
					readerDomains: readerDomains,
					isWriter: writerDomains.length > 0,
					writerDomains: writerDomains,
				},
			};
			return nextState;
		}
	}
	return state;
};

export default userReducer;
