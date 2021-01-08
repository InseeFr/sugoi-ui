import {
	Grid,
	Typography,
	Divider,
	Button,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
	TextField,
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	AddElementToHabilitations,
	DeleteElementInHabilitations,
} from './../../dataViewer/actions';
import User from '../../../../model/user';
interface props {
	data?: User | any;
	dispatch?: any;
}

export default function Habilitations({ data, dispatch }: props) {
	const [application, setApplication] = React.useState<any>(null);
	const [role, setRole] = React.useState<any>(null);
	const [propriete, setPropriete] = React.useState<any>(null);
	const handleClickAdd = () => {
		console.log(application, role, propriete);
		if (
			application ||
			(application && role) ||
			(application && role && propriete)
		) {
			let prop =
				application +
				(role
					? '_' + role + (propriete ? '_' + propriete : '')
					: '');
			dispatch({
				type: AddElementToHabilitations,
				payload: {
					value: prop,
				},
			});
		}
	};
	const handleClickDelete = (id: any) => {
		dispatch({
			type: DeleteElementInHabilitations,
			payload: {
				value: id,
			},
		});
	};

	return (
		<Grid container spacing={3} style={{ minWidth: '80%' }}>
			<Grid item xs={12} md={6} spacing={4}>
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
							Ajouter une habilitation
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
							value={application}
							fullWidth
							onChange={(e) =>
								setApplication(e.target.value)
							}
						/>
					</Grid>
					<Grid item>
						<TextField
							variant="outlined"
							label="Role"
							name="Role"
							value={role}
							fullWidth
							onChange={(e) =>
								setRole(e.target.value)
							}
						/>
					</Grid>
					<Grid item>
						<TextField
							variant="outlined"
							label="Propriété"
							name="Propriété"
							value={propriete}
							fullWidth
							onChange={(e) =>
								setPropriete(e.target.value)
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
							{data?.habilitations?.map(
								(
									habilitation: string,
									pos: any,
								) => (
									<ListItem>
										<ListItemText
											primary={
												habilitation
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
		</Grid>
	);
}
