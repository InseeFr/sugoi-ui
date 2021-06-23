import {
	Button,
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
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import ContactsIcon from '@material-ui/icons/Contacts';
import { Habilitation } from '../../../../../model/api/habilitation';
import PopIcon from '../../../popIcon/popIcon';
import {
	useAddAttribute,
	useDeleteAttribute,
} from '../../../../../hooks/api/user/useManageAttributes';
import { useParams } from 'react-router-dom';
import useGetUser from '../../../../../hooks/api/user/useGetUser';
import User from '../../../../../model/api/user';
import { postUserFromUserStorage } from '../../../../../api/remote';
import LoadingButton from '../../../loadingButton';

interface props {
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
	attribute_key: string;
}

const HabilitationsPopup = ({
	name,
	helpText,
	modifiable,
	attribute_key,
}: props) => {
	const { realm, userStorage, id } = useParams<any>();
	const { user, execute: executeUser, loading: loadingUser } = useGetUser(
		id,
		realm,
		userStorage,
	);
	const [application, setApplication] = React.useState<any>(undefined);
	const [role, setRole] = React.useState<any>(undefined);
	const [propriete, setPropriete] = React.useState<any>(undefined);
	const [edit, setEdit] = React.useState(false);
	const { execute, loading: loadingAdd } = useAddAttribute(attribute_key);
	const {
		execute: executeDelete,
		loading: loadingDelete,
	} = useDeleteAttribute(attribute_key);
	const handleClickAdd = () => {
		if ((application && role) || (application && role && propriete)) {
			let prop = {
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

	const handleClickDelete = (pos: number) => {
		user &&
			user.habilitations[pos].id &&
			executeDelete(
				realm,
				id,
				user?.habilitations[pos].id as string,
			).finally(() => {
				executeUser(id, realm, userStorage);
			});
	};

	return (
		<Grid container spacing={3} style={{ padding: 10 }}>
			<Grid item xs={12}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
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
				</div>
			</Grid>
			{!edit && (
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
							{user &&
								user.habilitations?.map(
									(
										habilitation: Habilitation,
										i: any,
									) => (
										<Grid item>
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
							justify="center"
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
								<TextField
									variant="outlined"
									label="Role"
									name="Role"
									value={role || ''}
									fullWidth
									onChange={(e) =>
										setRole(
											e.target
												.value,
										)
									}
									disabled={loadingAdd}
								/>
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
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						{loadingUser ? (
							<CircularProgress />
						) : (
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
													<ListItem>
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
