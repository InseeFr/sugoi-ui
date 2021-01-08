import {
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	AddElementToGroups,
	DeleteElementInGroups,
} from './../../dataViewer/actions';
import User from '../../../../model/user';

interface props {
	data?: User | any;
	dispatch?: any;
}

function not(a: string[], b: string[]) {
	return a.filter((value) => b.indexOf(value) === -1);
}

export default function Groupes({ data, dispatch }: props) {
	const [availableGroup, setAvailableGroup] = React.useState<string[]>([]);
	console.log(data);

	React.useEffect(() => {
		let groups = ['toto', 'tata'];
		if (!data.groups) {
			setAvailableGroup(not(groups, []));
		} else {
			setAvailableGroup(not(groups, data?.groups as string[]));
		}
	}, [data]);

	const handleClickAdd = (pos: number) => {
		dispatch({
			type: AddElementToGroups,
			payload: {
				value: availableGroup[pos],
			},
		});
	};

	const handleClickDelete = (id: number) => {
		dispatch({
			type: DeleteElementInGroups,
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
							Groupes disponibles:
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<List dense>
							{availableGroup?.map((value, pos) => {
								const labelId = `checkbox-list-label-role-${value}`;
								return (
									<ListItem>
										<ListItemText
											id={labelId}
											primary={
												value
											}
										/>
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="Add"
												onClick={() =>
													handleClickAdd(
														pos,
													)
												}
											>
												<AddIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
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
							Supprimer un Groupe
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<List dense={true}>
							{data?.groups?.map(
								(group: string, pos: any) => (
									<ListItem>
										<ListItemText
											primary={
												group
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
