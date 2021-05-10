import { Grid, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import useAddUserToGroup from '../../../hooks/api/group/useAddUserToGroup';
import useDeleteUserFromGroup from '../../../hooks/api/group/useDeleteUserFromGroup';
import { useGetGroup } from '../../../hooks/api/group/useGetGroup';
import { Group } from '../../../model/api/group';
import SimpleDialog from '../../commons/popButton/Dialog';
import { AddUsers } from './addUser';
import { GroupListUsers } from './listUser';

interface Props {
	realm: string;
	groupId: string;
	application: string;
	onClose: any;
}

export const ButtonManageGroup = ({
	realm,
	groupId,
	application,
	onClose,
}: Props) => {
	const [open, setOpen] = useState(false);
	const { execute: addUserToGroup } = useAddUserToGroup();
	const { execute: deleteUserFromGroup } = useDeleteUserFromGroup();
	const { execute: getGroup, group } = useGetGroup(
		realm,
		application,
		groupId,
	);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		onClose(realm, application);
	};

	const handleAddUserToGroup = (
		realm: string,
		applicationId: string,
		groupId: string,
	) => (userId: string) => {
		addUserToGroup(realm, applicationId, groupId, userId).then(() =>
			getGroup(realm, applicationId, groupId),
		);
	};

	const handleDeleteUserFromGroup = (
		realm: string,
		applicationId: string,
		groupId: string,
	) => (userId: string) => {
		deleteUserFromGroup(
			realm,
			applicationId,
			groupId,
			userId,
		).then(() => getGroup(realm, applicationId, groupId));
	};

	return (
		<>
			<IconButton
				aria-label="Add"
				size="small"
				onClick={handleOpen}
			>
				<SettingsIcon color="primary" fontSize="small" />
			</IconButton>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Gérer le groupe'}
				body={
					<Grid container direction="row">
						<Grid item xs={12} md={6}>
							<AddUsers
								realm={realm}
								group={group as Group}
								handleAddUser={handleAddUserToGroup(
									realm,
									application,
									groupId,
								)}
								handleDeleteUser={handleDeleteUserFromGroup(
									realm,
									application,
									groupId,
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<GroupListUsers
								realm={realm}
								group={group as Group}
							/>
						</Grid>
					</Grid>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};
