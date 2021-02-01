import {
	Button,
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
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import PopIcon from '../../../popIcon/popIcon';
import CreateIcon from '@material-ui/icons/Create';
import { Habilitation } from '../../../../../model/api/habilitation';

interface props {
	habilitations: Habilitation[];
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	handleChange: any;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
}

const HabilitationsPopup = ({
	name,
	helpTextTitle,
	helpText,
	habilitations,
	handleChange,
	modifiable,
	addTitle,
	deleteTitle,
}: props) => {
	const [application, setApplication] = React.useState<any>(undefined);
	const [role, setRole] = React.useState<any>(undefined);
	const [propriete, setPropriete] = React.useState<any>(undefined);
	const [edit, setEdit] = React.useState(false);

	const handleClickAdd = () => {
		if ((application && role) || (application && role && propriete)) {
			let prop = {
				application: application,
				role: role,
				property: propriete,
			};

			habilitations.push(prop);
			handleChange(habilitations);
			setApplication(undefined);
			setPropriete(undefined);
			setRole(undefined);
		}
	};

	const handleClickDelete = (pos: number) => {
		habilitations.splice(pos, 1);
		handleChange(habilitations);
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
			{!edit && habilitations.length > 0 ? (
				<Grid item xs={12}>
					{habilitations.map((habilitation) => (
						<li>
							{habilitation.application +
								'_' +
								habilitation.role +
								'_' +
								habilitation.property}
						</li>
					))}
				</Grid>
			) : null}
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
								/>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									style={{ float: 'right' }}
									onClick={handleClickAdd}
								>
									Ajouter
								</Button>
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
							<Grid item>
								<Typography
									align="left"
									variant="subtitle1"
								>
									Supprimer une habilitation
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<List dense={true}>
									{habilitations?.map(
										(
											habilitation: Habilitation,
											pos: any,
										) => (
											<ListItem>
												<ListItemText
													primary={
														habilitation.application +
														'_' +
														habilitation.role +
														'_' +
														habilitation.property
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
													>
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										),
									)}
								</List>
							</Grid>
						</Grid>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};

export default HabilitationsPopup;
