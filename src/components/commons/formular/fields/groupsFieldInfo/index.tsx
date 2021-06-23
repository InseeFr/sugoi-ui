import {
	Chip,
	Divider,
	Grid,
	IconButton,
	Typography,
	CircularProgress,
	LinearProgress,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PeopleIcon from '@material-ui/icons/People';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Group } from '../../../../../model/api/group';
import PopIcon from '../../../popIcon/popIcon';
import AutoCompleteApplication from './autocompleteApplication';
import ManageGroup from './manageGroup';
import { Loader } from '../../../loader/loader';
import { useGetApplication } from '../../../../../hooks/api/applications';
import useGetUser from '../../../../../hooks/api/user/useGetUser';
import {
	useAddGroupsToUser,
	useDeleteGroupsToUser,
} from '../../../../../hooks/api/user/useManageGroups';

interface props {
	textButton?: string;
	helpText?: string;
	name?: string;
	modifiable: boolean;
}

export default function GroupsField({ name, helpText, modifiable }: props) {
	const { realm, userStorage, id } = useParams<any>();
	const { user, execute: executeUser, loading: loadingUser } = useGetUser(
		id,
		realm,
		userStorage,
	);

	const { application, execute: searchApplication } = useGetApplication();

	const [applicationName, setApplicationName] = useState<
		string | undefined
	>();

	const { execute: executeAdd, loading: loadingAdd } = useAddGroupsToUser();
	const {
		execute: executeDelete,
		loading: loadingDelete,
	} = useDeleteGroupsToUser();

	const handleChangeOnApp = (application: string) => {
		if (application) {
			setApplicationName(application);
			searchApplication(realm, application);
		}
	};

	const [edit, setEdit] = useState(false);

	const handleClickAdd = (group: string) => {
		applicationName &&
			executeAdd(realm, applicationName, group, id).finally(() => {
				executeUser(id, realm, userStorage);
			});
	};

	const handleClickDelete = (group: string) => {
		applicationName &&
			executeDelete(realm, applicationName, group, id).finally(
				() => {
					executeUser(id, realm, userStorage);
				},
			);
	};

	return (
		<Grid container spacing={3} style={{ padding: 10 }}>
			<Grid item xs={12}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="subtitle1">
						{name}
					</Typography>
					<PopIcon helpText={helpText} />
					{modifiable && (
						<IconButton
							aria-label="info"
							size="small"
							onClick={() => setEdit(!edit)}
							color="primary"
						>
							<CreateIcon fontSize="inherit" />
						</IconButton>
					)}
				</div>
			</Grid>
			{modifiable && edit ? (
				<>
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="stretch"
							spacing={2}
						>
							<Grid item>
								<Typography
									align="left"
									variant="subtitle1"
								>
									Ajout/Suppression de
									groupes
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<Grid
									container
									direction="column"
									justify="center"
									alignItems="stretch"
									spacing={1}
								>
									<Grid item xs={12}>
										<AutoCompleteApplication
											application={
												applicationName
											}
											handleChangeApplication={
												handleChangeOnApp
											}
											realm={realm}
										/>
									</Grid>
									<Grid item xs={12}>
										<ManageGroup
											appGroups={
												application?.groups
											}
											groups={
												user?.groups ||
												[]
											}
											handleAdd={
												handleClickAdd
											}
											handleDelete={
												handleClickDelete
											}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="stretch"
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography
									align="left"
									variant="subtitle1"
								>
									Groupes
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								{loadingAdd ||
								loadingDelete ||
								loadingUser ? (
									<CircularProgress />
								) : (
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="stretch"
										spacing={2}
									>
										{user?.groups
											?.filter(
												(
													group: Group,
												) =>
													group !==
													null,
											)
											.map(
												(
													group: Group,
													i: any,
												) => (
													<Grid
														item
													>
														<Chip
															key={
																'group_' +
																i
															}
															color="default"
															size="small"
															icon={
																<PeopleIcon />
															}
															clickable={
																false
															}
															label={
																group.name
															}
														/>
													</Grid>
												),
											)}
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</>
			) : (
				<Grid item xs={12}>
					{loadingUser ? (
						<CircularProgress />
					) : (
						<Grid
							container
							direction="row"
							justify="flex-start"
							alignItems="stretch"
							spacing={1}
						>
							{user?.groups
								?.filter(
									(group: Group) =>
										group !== null,
								)
								.map((group: Group, i: any) => (
									<Grid
										item
										key={'groups_' + i}
									>
										<Chip
											color="default"
											size="small"
											icon={
												<PeopleIcon />
											}
											clickable={
												false
											}
											label={
												group.name
											}
										/>
									</Grid>
								))}
						</Grid>
					)}
				</Grid>
			)}
		</Grid>
	);
}
