import jwt_decode from 'jwt-decode';

interface AccessToken {
	realm_access: { roles: string[] };
}

export const getRolesFromToken = (accessToken: string): string[] =>
	(jwt_decode(accessToken) as AccessToken).realm_access.roles;
