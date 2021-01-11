import { Realm } from '../../model/api/realm';

export const saveConfig = (config: any) => ({
	type: 'saveConfig',
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
