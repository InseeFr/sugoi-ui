import { useEffect, useState } from 'react';
import { Field } from '../../model/field';
import { useGetRealms } from './useGetRealms';

export const useRealmConfig = (realmName: string) => {
	const [user, setUser] = useState<Field[]>([]);
	const [organization, setOrganization] = useState<Field[]>([]);
	const { realms: realmsConfig } = useGetRealms();

	useEffect(() => {
		const realm =
			realmsConfig?.filter((realm) => realm.name === realmName) ||
			[];
		setUser(realm[0]?.uiMapping?.uiUserMapping || []);
		setOrganization(realm[0]?.uiMapping?.uiOrganizationMapping || []);
	}, [realmName]);

	return {
		userConfig: user,
		organizationConfig: organization,
	};
};

export default useRealmConfig;
