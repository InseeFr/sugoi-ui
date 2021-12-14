import { useEffect, useState } from 'react';
import { Field } from '../../model/field';
import {
	realmHasApplication,
	realmHasOrganization,
} from '../../utils/functions';
import { useGetRealms } from './useGetRealms';

export const useRealmConfig = (realmName: string, userStorage?: string) => {
	const [user, setUser] = useState<Field[]>([]);
	const [organization, setOrganization] = useState<Field[]>([]);
	const { realms: realmsConfig } = useGetRealms();
	const [hasApplication, sethasApplication] = useState(false);
	const [hasOrganisation, sethasOrganization] = useState(false);

	useEffect(() => {
		const realm =
			realmsConfig?.filter((realm) => realm.name === realmName) ||
			[];
		setUser(realm[0]?.uiMapping?.uiUserMapping || []);
		setOrganization(realm[0]?.uiMapping?.uiOrganizationMapping || []);
		sethasOrganization(realmHasOrganization(realm[0], userStorage));
		sethasApplication(realmHasApplication(realm[0]));
	}, [realmName, realmsConfig, userStorage]);

	return {
		hasApplication,
		hasOrganisation,
		userConfig: user,
		organizationConfig: organization,
	};
};

export default useRealmConfig;
