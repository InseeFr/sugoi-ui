import {
	Grid,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetApplication } from '../../hooks/applications/useGetApplication';
import {
	useCreateGroup,
	useDeleteGroup,
	useUpdateGroup,
} from '../../hooks/group';
import { Group } from '../../model/api/group';
import Title from '../commons/title/title';
import ButtonCreateGroup from './ButtonCreateGroup';
import { ButtonDeleteGroup } from './ButtonDeleteGroup';
import { ButtonManageGroup } from './ButtonManageGroup';
import { ChipButton, ChipPerson } from './chip';

export const DetailsApplication = () => {
	const { realm, id: applicationId } = useParams<any>();
	const { application, execute, loading } = useGetApplication(
		realm,
		applicationId,
	);
	const { execute: createGroup } = useCreateGroup();
	const { execute: deleteGroup } = useDeleteGroup();
	const { execute: updateGroup } = useUpdateGroup();
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [page, setPage] = React.useState(1);

	const handleChange = (
		_event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	const handleCreateGroup = (realm: string, applicationId: string) => (
		group: Group,
	) => {
		createGroup(realm, applicationId, group).then(() =>
			execute(realm, applicationId),
		);
	};

	const handleUpdateGroup = (realm: string, applicationId: string) => (
		group: Group,
	) => {
		updateGroup(realm, applicationId, group).then(() =>
			execute(realm, applicationId),
		);
	};

	const handleDeleteGroup = (realm: string, applicationId: string) => (
		groupId: string,
	) => {
		deleteGroup(realm, applicationId, groupId).then(() =>
			execute(realm, applicationId),
		);
	};

	return (
		<>
			<Title title={"Détail de l' application " + applicationId} />
			{loading ? null : (
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item>
						<Grid
							container
							direction="row"
							justify="flex-end"
							alignItems="center"
							spacing={3}
						>
							<ButtonCreateGroup
								handleAddGroup={handleCreateGroup(
									realm,
									applicationId,
								)}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<TableContainer component={Paper}>
							<Table
								size="small"
								aria-label="a dense table"
							>
								<TableHead>
									<TableRow>
										<TableCell
											align="left"
											padding="default"
										>
											Groupe
										</TableCell>
										<TableCell
											align="left"
											padding="default"
										>
											Descriptions
										</TableCell>
										<TableCell
											align="left"
											padding="default"
										>
											Utilisateurs
										</TableCell>
										<TableCell
											align="left"
											padding="default"
										>
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{application?.groups ? (
										application.groups
											.slice(
												(page -
													1) *
													rowsPerPage,
												(page -
													1) *
													rowsPerPage +
													rowsPerPage,
											)
											.map(
												(
													group: any,
												) => (
													<TableRow
														key={
															group.name
														}
													>
														<TableCell
															component="th"
															scope="row"
														>
															{
																group.name
															}
														</TableCell>
														<TableCell
															component="th"
															scope="row"
														>
															{
																group.description
															}
														</TableCell>
														<TableCell
															component="th"
															scope="row"
														>
															{group?.users?.map(
																(
																	user: any,
																	i: any,
																) => {
																	return (
																		(i <
																			5 && (
																			<ChipPerson
																				user={
																					user
																				}
																				realm={
																					realm
																				}
																			/>
																		)) ||
																		(i ===
																			5 && (
																			<ChipButton
																				group={
																					group
																				}
																				realm={
																					realm
																				}
																			/>
																		))
																	);
																},
															)}
														</TableCell>
														<TableCell>
															<ButtonManageGroup
																realm={
																	realm
																}
																group={
																	group
																}
																handleUpdateGroup={handleUpdateGroup(
																	realm,
																	applicationId,
																)}
															/>
															<ButtonDeleteGroup
																group={
																	group
																}
																handleDeleteGroup={handleDeleteGroup(
																	realm,
																	applicationId,
																)}
															/>
														</TableCell>
													</TableRow>
												),
											)
									) : (
										<TableRow key="no-data">
											<TableCell
												component="th"
												scope="row"
											>
												Aucun
												groupe
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
							spacing={3}
						>
							<Grid item>
								<Grid item>
									<Select
										value={rowsPerPage}
										onChange={(
											e: any,
										) =>
											setRowsPerPage(
												e.target
													.value,
											)
										}
										displayEmpty
									>
										<MenuItem
											value={10}
										>
											10
										</MenuItem>
										<MenuItem
											value={20}
										>
											20
										</MenuItem>
										<MenuItem
											value={50}
										>
											50
										</MenuItem>
									</Select>
								</Grid>
							</Grid>
							<Pagination
								count={Math.ceil(
									application?.groups
										.length /
										rowsPerPage,
								)}
								page={page}
								color="primary"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	);
};
