import { isAdministrator, isReader, isWriter } from '../../utils/roles';

const initialRoleState = {};

const userReducer = (state = initialRoleState, action: any) => {
	let nextState;
	switch (action.type) {
		case 'loadUser':
			let reader = isReader(
				action.payload.user.profile?.roles,
				action.payload.config.readerRegexName,
			);
			let writer = isWriter(
				action.payload.user.profile?.roles,
				action.payload.config.writerRegexName,
			);
			let admin = isAdministrator(
				action.payload.user.profile?.roles,
				action.payload.config.adminName,
			);
			nextState = {
				...state,
				...action.payload.user,
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
