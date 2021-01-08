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
import {
	AddElementToRole,
	DeleteElementInRole,
} from '../../dataViewer/actions';
import User from '../../../../model/user';
import DeleteIcon from '@material-ui/icons/Delete';

interface props {
	data?: User | any;
	dispatch?: any;
}

export default function Roles({ data, dispatch }: props) {
	const [role, setRole] = React.useState<any>(null);
	const handleClickAdd = () => {
		if (role) {
			dispatch({
				type: AddElementToRole,
				payload: {
					value: role,
				},
			});
		}
	};
	const handleClickDelete = (id: any) => {
		dispatch({
			type: DeleteElementInRole,
			payload: {
				value: id,
			},
		});
	};

	return (
		<Grid container spacing={3}>
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
							Ajouter un Role
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
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
							Supprimer un rôle
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<List dense={true}>
							{data?.attributes?.roles?.map(
								(role: string, pos: any) => (
									<ListItem>
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
}
