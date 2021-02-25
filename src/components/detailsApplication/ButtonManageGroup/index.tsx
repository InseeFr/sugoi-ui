import { Button, Grid, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SimpleDialog from '../../commons/popButton/Dialog';
import { Group } from '../../../model/api/group';
import { GroupListUsers } from './listUser';
import { AddUsers } from './addUser';
import User from '../../../model/api/user';

interface Props {
	realm: string;
	group: Group;
	handleUpdateGroup: any;
}

export const ButtonManageGroup = ({
	realm,
	group,
	handleUpdateGroup,
}: Props) => {
	const [tempGroup, setTempGroup] = useState<Group>({
		name: group.name,
		description: group.description,
		users: group.users !== null ? group.users : [],
	});

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddUser = (username: string) => {
		setTempGroup({
			name: tempGroup.name,
			description: tempGroup.description,
			users: [...tempGroup?.users, { username: username }],
		});
	};

	const handleDeleteUser = (username: string) => {
		setTempGroup({
			name: tempGroup.name,
			description: tempGroup.description,
			users: tempGroup.users.filter(
				(user: User) => user.username !== username,
			),
		});
	};

	const onSubmit = () => {
		handleUpdateGroup(tempGroup);
		setOpen(false);
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
								group={tempGroup}
								handleAddUser={handleAddUser}
								handleDeleteUser={
									handleDeleteUser
								}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<GroupListUsers
								realm={realm}
								group={tempGroup}
							/>
						</Grid>
					</Grid>
				}
				actions={
					<Button color="primary" onClick={onSubmit}>
						Enregistrer
					</Button>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};
