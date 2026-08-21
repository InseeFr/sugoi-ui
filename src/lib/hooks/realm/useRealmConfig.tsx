import { useMemo } from 'react';
import {
	realmHasApplication,
	realmHasOrganization,
} from '../../utils/functions';
import { useGetRealms } from './useGetRealms';

export const useRealmConfig = (realmName: string, userStorage?: string) => {
	const { realms: realmsConfig } = useGetRealms();

	const realm = useMemo(() => {
		return (
			realmsConfig?.filter((realm) => realm.name === realmName) ||
			[]
		);
	}, [realmsConfig, realmName]);

	const userConfig = realm[0]?.uiMapping?.uiUserMapping || [];
	const organizationConfig =
		realm[0]?.uiMapping?.uiOrganizationMapping || [];
	const hasOrganisation = realmHasOrganization(realm[0], userStorage);
	const hasApplication = realmHasApplication(realm[0]);

	return {
		hasApplication,
		hasOrganisation,
		userConfig,
		organizationConfig,
	};
};

export default useRealmConfig;
