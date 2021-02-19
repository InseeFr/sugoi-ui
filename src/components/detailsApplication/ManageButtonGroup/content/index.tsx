import { Collapse, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Application from '../../../../model/api/application';
import { Group } from '../../../../model/api/group';
import { AddUsers } from './addUser';
import { CreateGroup } from './createGroup';
import { GroupSelector } from './groupSelector';
import { GroupListUsers } from './listUser';
interface Props {
	application: Application;
	realm: any;
	handleChangeOnApp: any;
}
export const BodyManagementGroup = ({
	application,
	realm,
	handleChangeOnApp,
}: Props) => {
	const [currentGroup, setCurrentGroup] = useState<Group | undefined>();
	const [showGroupCreate, setShowGroupCreate] = useState(false);

	const handleAddGroup = (groupName: string, groupDescription: string) => {
		if (
			application.groups.filter((group) => group.name === groupName)
				.length === 0
		) {
			handleChangeOnApp({
				name: application.name,
				owner: application.owner,
				groups: [
					...application.groups,
					{
						name: groupName.endsWith(
							'_' + application.name.toUpperCase(),
						)
							? groupName
							: groupName +
							  '_' +
							  application.name.toUpperCase(),
						description: groupDescription,
						users: [],
					},
				],
			});
			setShowGroupCreate(false);
		}
	};

	const handleShowGroupeCreate = (show: boolean) => {
		setShowGroupCreate(show);
	};

	const handleChangeCurrentGroup = (groupName: string) => {
		setCurrentGroup(
			application.groups.filter(
				(group) => group.name === groupName,
			)[0],
		);
	};

	useEffect(() => {
		if (showGroupCreate) {
			setCurrentGroup(undefined);
		}
	}, [showGroupCreate]);

	useEffect(() => {
		if (currentGroup) {
			setShowGroupCreate(false);
		}
	}, [currentGroup]);

	const handleAddUserToGroup = (username?: string) => {
		let group = {
			name: (currentGroup as Group).name,
			description: (currentGroup as Group).description,
			users: [
				...(currentGroup as Group).users,
				{ username: username },
			],
		};
		setCurrentGroup(group);
		handleChangeOnApp({
			name: application.name,
			owner: application.owner,
			groups: [
				...application.groups.filter(
					(_group) => _group.name !== group.name,
				),
				group,
			],
		});
	};

	const handleDeleteUserToGroup = (username?: string) => {
		let group = {
			name: (currentGroup as Group).name,
			description: (currentGroup as Group).description,
			users: [
				...(currentGroup as Group).users.filter(
					(user) => user.username !== username,
				),
			],
		};
		setCurrentGroup(group);
		handleChangeOnApp({
			name: application.name,
			owner: application.owner,
			groups: [
				...application.groups.filter(
					(_group) => _group.name !== group.name,
				),
				group,
			],
		});
	};

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			spacing={3}
		>
			<Grid item>
				<GroupSelector
					application={application}
					selectedGroup={currentGroup}
					handleShowGroupCreate={handleShowGroupeCreate}
					handleSelectedGroup={handleChangeCurrentGroup}
				/>
			</Grid>
			<Grid item>
				<Collapse in={showGroupCreate}>
					<CreateGroup
						handleAddGroup={handleAddGroup}
						handleShowGroupCreate={
							handleShowGroupeCreate
						}
					/>
				</Collapse>
				<Collapse
					in={
						!showGroupCreate &&
						currentGroup !== undefined
					}
				>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="stretch"
						spacing={1}
					>
						<Grid item xs={6}>
							<AddUsers
								realm={realm}
								group={currentGroup as Group}
								handleAddUser={
									handleAddUserToGroup
								}
								handleDeleteUser={
									handleDeleteUserToGroup
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<GroupListUsers
								group={currentGroup as Group}
								realm={realm}
							/>
						</Grid>
					</Grid>
				</Collapse>
			</Grid>
		</Grid>
	);
};
