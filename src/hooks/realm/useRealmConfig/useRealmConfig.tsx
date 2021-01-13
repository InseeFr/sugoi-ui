import FieldToDisplayConfigOrganization from './fieldToDisplay/FieldToDisplayConfigOrganization';
import FieldToDisplayConfigUser from './fieldToDisplay/FieldToDisplayConfigUser';

export const useRealmConfig = (realmName: string) => {
	return {
		userConfig: FieldToDisplayConfigUser,
		organizationConfig: FieldToDisplayConfigOrganization,
	};
};

export default useRealmConfig;
