import { useEffect, useState } from 'react';
import { Realm } from '../../../model/api/realm';
import FieldToDisplayConfigUser from './fieldToDisplay/FieldToDisplayConfigUser';
import FieldToDisplayConfigOrganization from './fieldToDisplay/FieldToDisplayConfigOrganization';

export const useRealmConfig = (realmName: string) => {
	const [realm, setRealm] = useState<Realm | undefined>();
	const [loading, setLoading] = useState(true);

	return {
		userConfig: FieldToDisplayConfigUser,
		organizationConfig: FieldToDisplayConfigOrganization,
		loading,
	};
};

export default useRealmConfig;
