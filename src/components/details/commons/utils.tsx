import User from '../../../model/user';

export const getElementFromAttributes = (user: User, name: string) => {
	return (user?.attributes as any)[name];
};

export const setElementToAttributes = (
	user: User,
	name: string,
	value: string,
) => {
	(user?.attributes as any)[name] = value;
};

export const getElement = (user: User, name: string) => {
	return (user as any)[name];
};
export const setElement = (user: User, name: string, value: string) => {
	return ((user as any)[name] = value);
};

export const getElementFromAddress = (user: User, name: string) => {
	if (user?.address) {
		return (user?.address as any)[name];
	} else return '';
};

export const setElementToAddress = (
	user: User,
	name: string,
	value: string,
) => {
	console.log(user);
	if (user?.address === undefined) {
		let address = {};
		user = { ...user, address: address };
	}
	(user?.address as any)[name] = value;
	return user;
};
