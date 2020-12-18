import jwt_decode from 'jwt-decode';

function parseWithPath(token: any, paths: string[]): string[] {
	return paths.length === 0
		? token
		: parseWithPath(
				token[paths[0]] as any,
				paths.slice(1, paths.length),
		  );
}

export const getRolesFromToken = (
	accessToken: string,
	jsonPathToRoles: string,
): string[] => {
	return parseWithPath(jwt_decode(accessToken), jsonPathToRoles.split('/'));
};
