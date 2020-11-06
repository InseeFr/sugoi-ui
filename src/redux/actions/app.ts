export const setAppConfig = (config: any) => ({
	type: 'appConfig',
	payload: { ...config },
});

export const changeTheme = (nameTheme: string) => ({
	type: 'changeTheme',
	payload: { nameTheme },
});
