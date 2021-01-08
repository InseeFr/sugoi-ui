import User from '../model/user';
import { getFakeRealms, getFakeUsers, getFakeUser } from './fake/fake';
import {
	getRemoteRealms,
	getRemoteUsers,
	getRemoteUser,
} from './remote/remote';

export const getRealms = () => {
	if (process.env.REACT_APP_FAKE_API) {
		return getFakeRealms();
	} else {
		return getRemoteRealms();
	}
};

export const getUsers = (domain: string) => {
	if (process.env.REACT_APP_FAKE_API) {
		return getFakeUsers(domain);
	} else {
		return getFakeUsers(domain);
	}
};

export const getUserByIdAndDomain = (id: string, domain: string) => {
	if (process.env.REACT_APP_FAKE_API) {
		return getFakeUser(domain, id);
	} else {
		return getFakeUser(domain, id);
	}
};
export const updateUserByIdAndDomain = async (realm: string, user: User) => {
	console.log(user);
};
