import {
	Chip,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	TextField,
	Typography,
	Box,
	Button,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import get from 'lodash.get';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingButton from 'src/components/shared/loadingButton';
import PopIcon from 'src/components/shared/popIcon/popIcon';
import { useAddAttribute, useDeleteAttribute } from 'src/lib/hooks/api-hooks';
import useGetUser from 'src/lib/hooks/user/useGetUser';

interface props {
	value: any;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
	attribute_key: string;
	defaultValues?: string[];
}

const SimpleAppManagedAttributes = ({
	name,
	helpTextTitle,
	helpText,
	value,
	modifiable,
	addTitle,
	deleteTitle,
	attribute_key,
	defaultValues,
}: props) => {
	const { realm, userStorage, id } = useParams() as {
		realm: string;
		userStorage?: string;
		id: string;
	};

	const [newValue, setNewValue] = React.useState<any>();
	const [edit, setEdit] = React.useState(false);
	const { execute, loading: loadingAdd } = useAddAttribute(attribute_key);
	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteAttribute(attribute_key);
	const {
		user,
		execute: executeUser,
		loading: loadingUser,
	} = useGetUser(id, realm, userStorage);
	const add = () => {
		execute(realm, id, newValue).finally(() => {
			setNewValue(undefined);
			executeUser(id, realm, userStorage);
		});
	};

	const handleClickAddDefault = (i: number) => {
		if (defaultValues != undefined) {
			const defaultRole: string = defaultValues[i];

			execute(realm, id, defaultRole).finally(() => {
				setNewValue(undefined);
				executeUser(id, realm, userStorage);
			});
		}
	};

	const delet = (pos: number) => {
		get(user, value, [])[pos] &&
			executeDelete(realm, id, get(user, value, [])[pos]).finally(
				() => {
					executeUser(id, realm, userStorage);
				},
			);
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="subtitle1">
						{name}
					</Typography>
					<PopIcon helpText={helpText} />
					<IconButton
						aria-label="info"
						size="small"
						onClick={() => setEdit(!edit)}
						color="primary"
					>
						<CreateIcon fontSize="inherit" />
					</IconButton>
				</Box>
			</Grid>
			{!edit ? (
				<Grid item xs={12}>
					{loadingUser ? (
						<CircularProgress />
					) : (
						<Grid
							container
							direction="row"
							justifyContent="flex-start"
							alignItems="stretch"
							spacing={1}
						>
							{loadingUser ? (
								<CircularProgress />
							) : (
								get(user, value, [])?.map(
									(val: any, i: any) => (
										<Grid item key={i}>
											<Chip
												key={
													'list_' +
													{
														name,
													} +
													'_' +
													i
												}
												color="default"
												size="small"
												clickable={
													false
												}
												label={
													val
												}
											/>
										</Grid>
									),
								)
							)}
						</Grid>
					)}
				</Grid>
			) : null}
			{edit && modifiable ? (
				<>
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="stretch"
							spacing={2}
						>
							<Grid item>
								<Typography
									align="left"
									variant="subtitle2"
								>
									{addTitle}
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<Box
									sx={{
										display: 'flex',
										alignItems:
											'center',
									}}
								>
									<TextField
										variant="outlined"
										label={name}
										name={name}
										value={
											newValue || ''
										}
										fullWidth
										onChange={(e) =>
											setNewValue(
												e.target
													.value,
											)
										}
										disabled={
											loadingAdd
										}
									/>
									<PopIcon
										helpTextTitle={
											helpTextTitle
										}
										helpText={helpText}
									/>
								</Box>
							</Grid>
							<Grid item>
								<LoadingButton
									variant="contained"
									color="primary"
									handleClick={add}
									loading={loadingAdd}
								>
									Ajouter
								</LoadingButton>
							</Grid>
							<Grid item>
								<Grid
									container
									direction="column"
									justifyContent="left"
									alignItems="stretch"
									spacing={2}
								>
									{defaultValues !=
										undefined &&
									defaultValues.length >
										0 ? (
										<Grid item>
											<Grid
												container
												direction="row"
												justifyContent="left"
												alignItems="stretch"
												spacing={
													2
												}
											>
												<Grid
													item
												>
													<p>
														Ajouter
														…{' '}
													</p>
												</Grid>
											</Grid>
											<Grid item>
												<Grid
													container
													direction="column"
													justifyContent="center"
													alignItems="stretch"
													spacing={
														2
													}
												>
													{defaultValues.map(
														(
															value: any,
															i: any,
														) => (
															<Grid
																item
																key={
																	'cadreRole_' +
																	i
																}
															>
																<Button
																	color="primary"
																	variant="contained"
																	key={
																		'defaultRole_' +
																		i
																	}
																	onClick={() =>
																		handleClickAddDefault(
																			i,
																		)
																	}
																>
																	{value +
																		' +'}
																</Button>
															</Grid>
														),
													)}
												</Grid>
											</Grid>
										</Grid>
									) : (
										<Grid item></Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="stretch"
							spacing={2}
						>
							<>
								<Grid item>
									<Typography
										align="left"
										variant="subtitle2"
									>
										{deleteTitle}
									</Typography>
								</Grid>
								<Grid item>
									<Divider />
								</Grid>
							</>
							<Grid item>
								{loadingUser ? (
									<CircularProgress />
								) : (
									<List dense={true}>
										{get(
											user,
											value,
											[],
										).map(
											(
												item: string,
												pos: any,
											) => (
												<ListItem
													key={
														'list-propriete-item-' +
														pos
													}
												>
													<ListItemText
														primary={
															item
														}
													/>

													<ListItemSecondaryAction>
														<IconButton
															edge="end"
															aria-label="delete"
															onClick={() =>
																delet(
																	pos,
																)
															}
															disabled={
																loadingDelete
															}
															size="large"
														>
															<DeleteIcon />
															{loadingDelete && (
																<CircularProgress />
															)}
														</IconButton>
													</ListItemSecondaryAction>
												</ListItem>
											),
										)}
									</List>
								)}
							</Grid>
						</Grid>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};

export default SimpleAppManagedAttributes;
