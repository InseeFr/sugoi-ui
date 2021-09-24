export const saveConfig = (config: any) => ({
	type: 'saveConfig',
	payload: { ...config },
});

export const changeTheme = (nameTheme: string) => ({
	type: 'changeTheme',
	payload: { nameTheme },
});

export const changeStatusNotifDebug = (enabled: boolean) => ({
	type: 'changeStatusNotifDebug',
	payload: { enabled },
});
