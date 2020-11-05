export const setAppConfig = (config: any) => ({
	type: 'appConfig',
	payload: { ...config },
});
