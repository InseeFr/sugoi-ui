export const isReader = (
	readerRegexName: string,
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	const regex = new RegExp(readerRegexName);
	let t = tokenParsed?.realm_access?.roles.filter((role) =>
		role.match(regex),
	).length;
	return t ? t > 0 : false;
};

export const isAdministrator = (
	adminName: string,
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	let t = tokenParsed?.realm_access?.roles.filter((role) =>
		role.includes(adminName),
	).length;
	return t ? t > 0 : false;
};

export const isWriter = (
	writerRegexName: string,
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	const regex = new RegExp(writerRegexName);
	let t = tokenParsed?.realm_access?.roles.filter((role) =>
		role.match(regex),
	).length;
	return t ? t > 0 : false;
};

export const getRoles = (
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	return null;
};
