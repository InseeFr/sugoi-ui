export const isConsultant = (
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	const regex = new RegExp('/Consultant_(.*)_Ouganext/');
	let t = tokenParsed?.realm_access?.roles.filter((role) =>
		role.match(regex),
	).length;
	return t ? t > 0 : false;
};

export const isAdministrateur = (
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	let t = tokenParsed?.realm_access?.roles.filter((role) =>
		role.includes('Administrateurs_Ouganext'),
	).length;
	return t ? t > 0 : false;
};

export const isGestionnaire = (
	tokenParsed: Keycloak.KeycloakTokenParsed | undefined,
) => {
	const regex = new RegExp('/Consultant_(.*)_Ouganext/');
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
