import { Realm } from '../../model/interface';

export const setAppConfig = (config: any) => ({
	type: 'appConfig',
	payload: { ...config },
});

export const changeTheme = (nameTheme: string) => ({
	type: 'changeTheme',
	payload: { nameTheme },
});

export const saveRealms = (realms: Realm[]) => ({
	type: 'saveRealms',
	payload: { realms },
});
