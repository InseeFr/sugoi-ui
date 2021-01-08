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
import User from '../../../../model/user';

interface props {
	data?: User | any;
	dispatch?: any;
}

export default function Roles({ data, dispatch }: props) {
	const [role, setRole] = React.useState<any>(null);
	const handleClickAdd = () => {
		if (role) {
		}
	};
	const handleClickDelete = (id: any) => {};

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
