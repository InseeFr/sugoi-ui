import users from './data/users.json';

const get = (data: any) => Promise.resolve(data);

export const getFakeRealms = () => {
	return get([{ name: 'toto' }]);
};

export const getFakeUsers = (domain: string) => {
	return get(users);
};
export const getFakeUser = (domain: string, id: string) => {
	return get(users[0]);
};
