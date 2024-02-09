import DetailEntityContent from 'src/components/shared/detailEntityContent/detail_entity_content';
import {
	useDeleteOrganization,
	useUpdateOrganization,
} from 'src/lib/hooks/api-hooks';
import Organization from 'src/lib/model/api/organization';
import { Field } from 'src/lib/model/field';

const DetailOrganizationContent = ({
	organization,
	execute,
	realm,
	userStorage,
	organizationConfig,
}: {
	organization: Organization;
	execute: (
		id: string,
		realm: string,
		userStorage?: string,
	) => Promise<void>;
	realm: string;
	userStorage?: string;
	organizationConfig: Field[];
}) => {
	const { execute: executeUpdate, loading: loadingUpdate } =
		useUpdateOrganization();

	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteOrganization();

	const deleteRedirectPath =
		'/realm/' +
		realm +
		(userStorage
			? '/us/' + userStorage + '/organizations'
			: '/organizations');

	return (
		<DetailEntityContent
			entity={organization}
			entityId={organization.identifiant ?? ''}
			isUser={false}
			realm={realm}
			userStorage={userStorage}
			executeUpdate={executeUpdate}
			loadingUpdate={loadingUpdate}
			executeDelete={executeDelete}
			loadingDelete={loadingDelete}
			executeGet={execute}
			fieldsConfig={organizationConfig}
			deleteRedirectPath={deleteRedirectPath}
			rootTranslation={'detail_organization'}
		></DetailEntityContent>
	);
};

export default DetailOrganizationContent;
