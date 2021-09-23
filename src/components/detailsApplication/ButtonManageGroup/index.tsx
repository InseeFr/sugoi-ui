import React, { useEffect } from 'react';
import useAddUserToGroupManager from '../../../hooks/group/useAddToGroupManager';
import useAddUserToGroup from '../../../hooks/group/useAddUserToGroup';
import useDeleteUserFromGroup from '../../../hooks/group/useDeleteUserFromGroup';
import useDeleteUserFromGroupManager from '../../../hooks/group/useDeleteUserFromGroupManager';
import { useGetGroup } from '../../../hooks/group/useGetGroup';
import useGetGroupManager from '../../../hooks/group/useGetGroupManager';
import { Group } from '../../../model/api/group';
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

export const ButtonManageManagerGroup = ({
	realm,
	onClose,
	applicationName,
	groupName,
}: Props) => {
	const { execute: addUserToGroup } = useAddUserToGroupManager();

	const { execute: deleteUserFromGroup } = useDeleteUserFromGroupManager();

	const { execute: getGroup, group } = useGetGroupManager();

	const handleAddUserToGroup =
		(realm: string, applicationId: string, groupId: string) =>
		(userId: string) => {
			addUserToGroup(realm, applicationId, userId).then(() =>
				getGroup(realm, applicationId),
			);
		};

	const handleDeleteUserFromGroup =
		(realm: string, applicationId: string, groupId: string) =>
		(userId: string) => {
			deleteUserFromGroup(realm, applicationId, userId).then(() =>
				getGroup(realm, applicationId),
			);
		};

	useEffect(() => {
		getGroup(realm, applicationName);
	}, [realm, applicationName, getGroup]);

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
