import User from './../../model/user';

export const getElementFromAttributes = (user: User, name: any) => {
	if (user?.attributes) {
		return (user?.attributes as any)[name];
	} else return '';
};

export const addElementToHabilitation = (user: User, element: string) => {
	let habilitations: string[] = [];
	if (user?.habilitation === undefined) {
		user = { ...user, habilitation: habilitations };
	}
	habilitations = user.habilitation;
	habilitations.push(element);
	user.habilitation = habilitations;
	return user;
};

export const DeleteElementToHabilitation = (user: User, pos: number) => {
	user.habilitation.splice(pos, 1);
	return user;
};

export const setElementToAttributes = (
	user: User,
	name: string,
	value: string,
) => {
	if (user?.attributes === undefined) {
		let attributes = {};
		user = { ...user, attributes: attributes };
	}
	(user?.attributes as any)[name] = value;
	return user;
};

export const getElementFromRoot = (user: User, name: any) => {
	if ((user as any)[name]) {
		return (user as any)[name];
	} else return '';
};
export const setElementToRoot = (user: User, name: string, value: any) => {
	(user as any)[name] = value;
	return user;
};

export const getElementFromAddress = (user: User, name: any) => {
	if (user?.address) {
		return (user?.address as any)[name];
	} else return '';
};

export const setElementToAddress = (
	user: User,
	name: string,
	value: string,
) => {
	if (user?.address === undefined) {
		let address = {};
		user = { ...user, address: address };
	}
	(user?.address as any)[name] = value;
	return user;
};
