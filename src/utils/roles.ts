export const isReader = (roles: string[], readerRegexName: string) => {
	const regex = new RegExp(readerRegexName);
	let readerDomain: any[] = [];
	if (roles) {
		readerDomain = roles
			.filter((role: string) => role.match(regex))
			.map((role: string) => {
				const found = role.match(regex);
				return found ? found[1] : null;
			});
	}
	return [
		readerDomain.length ? readerDomain.length > 0 : false,
		readerDomain,
	];
};

export const isAdministrator = (roles: string[], adminName: string) => {
	let t: any = [];
	if (roles) {
		t = roles.filter((role: string) => role.includes(adminName)).length;
	}
	return t ? t > 0 : false;
};

export const isWriter = (roles: string[], writerRegexName: string) => {
	const regex = new RegExp(writerRegexName);
	let writeDomain: any[] = [];
	if (roles) {
		writeDomain = roles
			.filter((role: string) => role.match(regex))
			.map((role: string) => {
				const found = role.match(regex);
				return found ? found[1] : null;
			});
	}
	return [writeDomain.length ? writeDomain.length > 0 : false, writeDomain];
};

export const getRoles = (tokenParsed: any | undefined) => {
	return null;
};
