export const setAppConfig = (config: any) => ({
	type: 'appConfig',
	payload: { ...config },
});

export const changeTheme = (nameTheme: string) => ({
	type: 'changeTheme',
	payload: { nameTheme },
});

export const tokenChanged = (text: any) => ({
	type: 'appConfig/tokenChanged',
	payload: text,
});
