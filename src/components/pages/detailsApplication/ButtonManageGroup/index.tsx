import useAddUserToGroupManager from 'src/lib/hooks/group/useAddToGroupManager';
import useAddUserToGroup from 'src/lib/hooks/group/useAddUserToGroup';
import useDeleteUserFromGroup from 'src/lib/hooks/group/useDeleteUserFromGroup';
import useDeleteUserFromGroupManager from 'src/lib/hooks/group/useDeleteUserFromGroupManager';
import { useGetGroup } from 'src/lib/hooks/group/useGetGroup';
import useGetGroupManager from 'src/lib/hooks/group/useGetGroupManager';
import { Group } from 'src/lib/model/api/group';
import GenericButtonManageGroup from './genericButtonManageGroup';

interface Props {
	realm: string;
	applicationName: string;
	groupName: string;
	onClose: any;
}

export const ButtonManageGroup = ({
	realm,
	onClose,
	applicationName,
	groupName,
}: Props) => {
	const { execute: addUserToGroup } = useAddUserToGroup();

	const { execute: deleteUserFromGroup } = useDeleteUserFromGroup();

	const { execute: getGroup, group } = useGetGroup(
		realm,
		applicationName,
		groupName,
	);

	const handleAddUserToGroup =
		(realm: string, applicationId: string, groupId: string) =>
		(userId: string) => {
			addUserToGroup(realm, applicationId, groupId, userId).then(
				() => getGroup(realm, applicationId, groupId),
			);
		};

	const handleDeleteUserFromGroup =
		(realm: string, applicationId: string, groupId: string) =>
		(userId: string) => {
			deleteUserFromGroup(
				realm,
				applicationId,
				groupId,
				userId,
			).then(() => getGroup(realm, applicationId, groupId));
		};

	return (
		<GenericButtonManageGroup
			realm={realm}
			onClose={() => onClose()}
			group={group as Group}
			handleAddUserToGroup={() =>
				handleAddUserToGroup(realm, applicationName, groupName)
			}
			handleDeleteUserFromGroup={() =>
				handleDeleteUserFromGroup(
					realm,
					applicationName,
					groupName,
				)
			}
		/>
	);
};

export const ButtonManageManagerGroup = ({
	realm,
	onClose,
	applicationName,
	groupName,
}: Props) => {
	const { execute: addUserToGroup } = useAddUserToGroupManager();

	const { execute: deleteUserFromGroup } = useDeleteUserFromGroupManager();

	const { execute: getGroup, group } = useGetGroupManager(
		realm,
		applicationName,
	);

	const handleAddUserToGroup =
		(realm: string, applicationId: string, _groupId: string) =>
		(userId: string) => {
			addUserToGroup(realm, applicationId, userId).then(() =>
				getGroup(realm, applicationId),
			);
		};

	const handleDeleteUserFromGroup =
		(realm: string, applicationId: string, _groupId: string) =>
		(userId: string) => {
			deleteUserFromGroup(realm, applicationId, userId).then(() =>
				getGroup(realm, applicationId),
			);
		};

	return (
		<GenericButtonManageGroup
			realm={realm}
			onClose={onClose}
			group={group as Group}
			handleAddUserToGroup={() =>
				handleAddUserToGroup(realm, applicationName, groupName)
			}
			handleDeleteUserFromGroup={() =>
				handleDeleteUserFromGroup(
					realm,
					applicationName,
					groupName,
				)
			}
		/>
	);
};
