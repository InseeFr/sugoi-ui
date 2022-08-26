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
import ContactsIcon from '@mui/icons-material/Contacts';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingButton from 'src/components/shared/loadingButton';
import PopIcon from 'src/components/shared/popIcon/popIcon';
import {
	useAddAttribute,
	useDeleteAttribute,
	useGetUser,
} from 'src/lib/hooks/api-hooks';
import { Habilitation } from 'src/lib/model/api/habilitation';

interface props {
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

const HabilitationsPopup = ({
	name,
	helpText,
	modifiable,
	attribute_key,
	defaultValues,
}: props) => {
	const { realm, userStorage, id } = useParams<any>();
	const {
		user,
		execute: executeUser,
		loading: loadingUser,
	} = useGetUser(id, realm, userStorage);
	const [application, setApplication] = React.useState<any>(undefined);
	const [role, setRole] = React.useState<any>(undefined);
	const [propriete, setPropriete] = React.useState<any>(undefined);
	const [edit, setEdit] = React.useState(false);
	const { execute, loading: loadingAdd } = useAddAttribute(attribute_key);
	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteAttribute(attribute_key);
	const handleClickAdd = () => {
		if ((application && role) || (application && role && propriete)) {
			const prop = {
				id: propriete
					? propriete + '_' + role + '_' + application
					: role + '_' + application,
				application: application,
				role: role,
				property: propriete,
			};
			execute(realm, id, prop.id).finally(() => {
				setApplication(undefined);
				setPropriete(undefined);
				setRole(undefined);
				executeUser(id, realm, userStorage);
			});
		}
	};

	const handleClickAddDefault = (i: number) => {
		if (defaultValues != undefined) {
			const defaultRole: string = defaultValues[i];

			execute(realm, id, defaultRole).finally(() => {
				setApplication(undefined);
				setPropriete(undefined);
				setRole(undefined);
				executeUser(id, realm, userStorage);
			});
		}
	};

	const handleClickDelete = (pos: number) => {
		user &&
			user.habilitations &&
			user.habilitations[pos].id &&
			executeDelete(realm, id, user.habilitations[pos].id).finally(
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
			{!edit && (
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
							{user &&
								user.habilitations?.map(
									(
										habilitation: Habilitation,
										i: any,
									) => (
										<Grid item key={i}>
											<Chip
												key={
													'habilitation_' +
													i
												}
												color="default"
												size="small"
												icon={
													<ContactsIcon />
												}
												clickable={
													false
												}
												label={
													habilitation.id
												}
											/>
										</Grid>
									),
								)}
						</Grid>
					)}
				</Grid>
			)}
			{modifiable && edit ? (
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
									variant="subtitle1"
								>
									{name}
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<TextField
									variant="outlined"
									label="Application"
									name="Application"
									value={application || ''}
									fullWidth
									onChange={(e) =>
										setApplication(
											e.target
												.value,
										)
									}
									disabled={loadingAdd}
								/>
							</Grid>
							<Grid item>
								<Grid
									container
									direction="row"
									justifyContent="left"
									alignItems="stretch"
									spacing={2}
								>
									<Grid item>
										<TextField
											variant="outlined"
											label="Role"
											name="Role"
											value={
												role ||
												''
											}
											fullWidth
											onChange={(
												e,
											) =>
												setRole(
													e
														.target
														.value,
												)
											}
											disabled={
												loadingAdd
											}
										/>
									</Grid>
								</Grid>
							</Grid>

							<Grid item>
								<TextField
									variant="outlined"
									label="Propriété"
									name="Propriété"
									value={propriete || ''}
									fullWidth
									onChange={(e) =>
										setPropriete(
											e.target
												.value,
										)
									}
									disabled={loadingAdd}
								/>
							</Grid>
							<Grid item>
								<LoadingButton
									variant="contained"
									color="primary"
									loading={loadingAdd}
									handleClick={
										handleClickAdd
									}
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
									<Grid item>
										<Grid
											container
											direction="row"
											justifyContent="left"
											alignItems="stretch"
											spacing={2}
										>
											<Grid item>
												<p>
													Ajouter
													l’habilitation
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
												{defaultValues?.map(
													(
														value: any,
														i: any,
													) => (
														<Grid
															item
															key={
																'cadreHabilitation_' +
																i
															}
														>
															<Button
																color="primary"
																variant="contained"
																key={
																	'defaultHabilitation_' +
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
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						{loadingUser ? (
							<CircularProgress />
						) : (
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
										variant="subtitle1"
									>
										Supprimer une
										habilitation
									</Typography>
								</Grid>
								<Grid item>
									<Divider />
								</Grid>
								<Grid item>
									<List dense={true}>
										{user &&
											user.habilitations?.map(
												(
													habilitation: Habilitation,
													pos: any,
												) => (
													<ListItem
														key={
															pos
														}
													>
														<ListItemText
															primary={
																habilitation.id
															}
														/>
														<ListItemSecondaryAction>
															<IconButton
																edge="end"
																aria-label="delete"
																onClick={() =>
																	handleClickDelete(
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
								</Grid>
							</Grid>
						)}
					</Grid>
				</>
			) : null}
		</Grid>
	);
};

export default HabilitationsPopup;
