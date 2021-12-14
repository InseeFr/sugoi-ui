export const getRegexDomains = (roles: string[], regex: string): string[] =>
	roles
		.filter((role: string) => role.match(RegExp(regex)))
		.map((role: string): string => {
			const matchingRoles = role.match(RegExp(regex));
			return matchingRoles ? matchingRoles[1] : '';
		});

export const isAdministrator = (roles: string[], adminName: string): boolean =>
	roles.includes(adminName);
