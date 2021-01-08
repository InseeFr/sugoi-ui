import User from './../../model/user';
import Organization from './../../model/organization';

export const getElementFromAttributes = (
	data: User | Organization,
	name: any,
) => {
	if (data?.attributes) {
		return (data?.attributes as any)[name];
	} else return '';
};

export const addElementToHabilitation = (user: User, element: string) => {
	let habilitations: string[] = [];
	if (user?.habilitations === undefined) {
		user = { ...user, habilitations: habilitations };
	}
	habilitations = user.habilitations;
	habilitations.push(element);
	user.habilitations = habilitations;
	return user;
};

export const DeleteElementInHabilitation = (user: User, pos: number) => {
	user.habilitations.splice(pos, 1);
	return user;
};

export const addElementToMetadatas = (
	data: User | Organization,
	element: string,
) => {
	let metadatas: string[] = [];
	if (data?.metadatas === undefined) {
		data = { ...data, metadatas: metadatas };
	}
	metadatas = data.metadatas;
	metadatas.push(element);
	data.metadatas = metadatas;
	return data;
};

export const DeleteElementInMetadats = (
	data: User | Organization,
	pos: number,
) => {
	data.metadatas.splice(pos, 1);
	return data;
};

export const addElementToRoles = (user: User, element: string) => {
	let roles: string[] = [];
	if (user?.attributes?.roles === undefined) {
		user = { ...user, attributes: { ...user.attributes, roles: [] } };
	}
	roles = user.attributes.roles as string[];
	roles.push(element);
	user.attributes.roles = roles;
	return user;
};

export const DeleteElementInRoles = (user: User, pos: number) => {
	(user.attributes.roles as string[]).splice(pos, 1);
	return user;
};

export const addElementToPropriete = (
	data: User | Organization,
	element: string,
) => {
	let proprietes: string[] = [];
	if (data?.attributes?.proprietes === undefined) {
		data = {
			...data,
			attributes: { ...data.attributes, proprietes: [] },
		};
	}
	proprietes = data.attributes.proprietes as string[];
	proprietes.push(element);
	data.attributes.proprietes = proprietes;
	return data;
};

export const DeleteElementInPropriete = (
	data: User | Organization,
	pos: number,
) => {
	(data.attributes.proprietes as string[]).splice(pos, 1);
	return data;
};

export const addElementToGroups = (user: User, element: string) => {
	let groups: string[] = [];
	if (user?.groups === undefined) {
		user = { ...user, groups: groups };
	}
	groups = user.groups;
	groups.push(element);
	user.groups = groups;
	return user;
};

export const DeleteElementInGroups = (user: User, pos: number) => {
	user.groups.splice(pos, 1);
	return user;
};

export const setElementToAttributes = (
	data: User | Organization,
	name: string,
	value: string,
) => {
	if (data?.attributes === undefined) {
		let attributes = {};
		data = { ...data, attributes: attributes };
	}
	(data?.attributes as any)[name] = value;
	return data;
};

export const getElementFromRoot = (data: User | Organization, name: any) => {
	if ((data as any)[name]) {
		return (data as any)[name];
	} else return '';
};
export const setElementToRoot = (
	data: User | Organization,
	name: string,
	value: any,
) => {
	(data as any)[name] = value;
	return data;
};

export const getElementFromAddress = (data: User | Organization, name: any) => {
	if (data?.address) {
		return (data?.address as any)[name];
	} else return '';
};

export const setElementToAddress = (
	data: User | Organization,
	name: string,
	value: string,
) => {
	if (data?.address === undefined) {
		let address = {};
		data = { ...data, address: address };
	}
	(data?.address as any)[name] = value;
	return data;
};
