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
import Organization from '../../../../model/organization';
import User from '../../../../model/user';
import * as Actions from '../actions';
import DeleteIcon from '@material-ui/icons/Delete';
import PopIcon from '../../popIcon/popIcon';
import get from 'lodash.get';

interface props {
	data: User | Organization;
	title?: string;
	helpTextTitle?: string;
	helpText?: string;
	path: string;
	handleChange: any;
}

const ListFieldInfo = ({ data, path, handleChange }: props) => {
	const [newValue, setNewValue] = React.useState<string | null>(null);

	const add = () => {
		handleChange(path, get(data, path, []).push(newValue));
	};

	const delet = (pos: number) => {
		get(data, path).splice(pos, 1);
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
								value={newValue || ''}
								fullWidth
								onChange={(e) =>
									setNewValue(
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
							onClick={add}
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
							{get(data, path)?.map(
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
													delet(
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

export default ListFieldInfo;
