import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../configuration/store-configuration';
import { Realm } from '../../model/api/realm';
import { Field } from '../../model/field';

export const useRealmConfig = (realmName: string) => {
	const [user, setUser] = useState<Field[]>([]);
	const [organization, setOrganization] = useState<Field[]>([]);
	const realmsConfig: Realm[] = useSelector(
		(state: RootState) => state.app.realms,
	);

	useEffect(() => {
		const realm = realmsConfig.filter(
			(realm) => realm.name === realmName,
		);
		console.log(realm);
		setUser(realm[0]?.uiMapping?.uiUserMapping || []);
		setOrganization(realm[0]?.uiMapping?.uiOrganizationMapping || []);
	}, [realmName]);

	return {
		userConfig: user,
		organizationConfig: organization,
	};
};

export default useRealmConfig;
