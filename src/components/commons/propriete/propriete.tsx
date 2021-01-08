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
import React from 'react';
import Organization from '../../../model/organization';
import User from './../../../model/user';
import * as Actions from './../dataViewer/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import PopIcon from '../popIcon/popIcon';

interface props {
	data: User | Organization;
	dispatch: React.Dispatch<any>;
	fieldToDisplay?: any[];
}

const Proprietes = ({ data, dispatch }: props) => {
	const [propriete, setPropriete] = React.useState<string | null>(null);
	const handleClickAdd = () => {
		if (propriete) {
			dispatch({
				type: Actions.AddElementToPropriete,
				payload: {
					value: propriete,
				},
			});
		}
	};

	const handleClickDelete = (id: any) => {
		dispatch({
			type: Actions.DeleteElementInPropriete,
			payload: {
				value: id,
			},
		});
	};

	return (
		<Grid container spacing={3}>
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
							Ajouter une propriété
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<TextField
								variant="outlined"
								label="Propriété"
								name="Propriété"
								value={propriete || ''}
								fullWidth
								onChange={(e) =>
									setPropriete(
										e.target.value,
									)
								}
							/>
							<PopIcon
								helpTextTitle={
									" Propriétés de l'organisation "
								}
								helpText={
									'Ajouter une propriété à saisir en cliquant sur "Ajouter un champ". Supprimer une propriété saisie en vidant le champ ou en cliquant sur la croix rouge à droite du champ. Aucune limite d\'ajout.'
								}
							/>
						</div>
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
							Supprimer une propriété
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<List dense={true}>
							{data?.attributes?.proprietes?.map(
								(role: string, pos: any) => (
									<ListItem
										key={
											'list-propriete-item-' +
											pos
										}
									>
										<ListItemText
											primary={role}
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
};

export default Proprietes;
