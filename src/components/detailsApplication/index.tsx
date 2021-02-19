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
import { useSnackbar } from 'notistack';
import React from 'react';
import { useParams } from 'react-router-dom';
import { putApplication } from '../../api';
import { useGetApplication } from '../../hooks/applications/useGetApplication';
import Application from '../../model/api/application';
import Title from '../commons/title/title';
import { ChipButton, ChipPerson } from './chip';
import { ButtonManageGroup } from './ManageButtonGroup';
import { useTranslation } from 'react-i18next';

export const DetailsApplication = () => {
	const { realm, id } = useParams<any>();
	const { application, execute, loading } = useGetApplication(realm, id);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const handleChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	const handleSave = (app: Application) => {
		putApplication(realm, app)
			.then((r) => execute(realm, id))
			.catch((err) =>
				enqueueSnackbar(t('details_application.error') + err, {
					variant: 'error',
				}),
			);
	};

	return (
		<>
			<Title title={"Détail de l' application " + id} />
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
							<ButtonManageGroup
								realm={realm}
								application={application}
								handleSave={handleSave}
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
