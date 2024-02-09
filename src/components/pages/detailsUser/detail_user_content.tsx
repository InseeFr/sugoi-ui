import DetailEntityContent from 'src/components/shared/detailEntityContent/detail_entity_content';
import { useDeleteUser, useUpdateUser } from 'src/lib/hooks/user';
import User from 'src/lib/model/api/user';

const DetailUserContent = ({
	user,
	execute,
	realm,
	userStorage,
	userConfig,
}: {
	user: User;
	execute: any;
	realm: string;
	userStorage?: string;
	userConfig: any;
}) => {
	const { execute: executeUpdate, loading: loadingUpdate } =
		useUpdateUser();

	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteUser();

	const deleteRedirectPath =
		'/realm/' +
		realm +
		(userStorage ? '/us/' + userStorage + '/users' : '/users');

	return (
		<DetailEntityContent
			entity={user}
			entityId={user.username ?? ''}
			isUser={true}
			realm={realm}
			userStorage={userStorage}
			executeUpdate={executeUpdate}
			loadingUpdate={loadingUpdate}
			executeDelete={executeDelete}
			loadingDelete={loadingDelete}
			executeGet={execute}
			fieldsConfig={userConfig}
			deleteRedirectPath={deleteRedirectPath}
			rootTranslation={'detail_user'}
		></DetailEntityContent>
	);
};

export default DetailUserContent;
