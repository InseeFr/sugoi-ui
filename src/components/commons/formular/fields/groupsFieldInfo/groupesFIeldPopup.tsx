import {
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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useGetGroups } from '../../../../../hooks/group/useGetGroups';
import PopIcon from '../../../popIcon/popIcon';
import CreateIcon from '@material-ui/icons/Create';

interface props {
	groups: any;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	handleChange: any;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
}

function not(a: string[], b: string[]) {
	return a.filter((value) => b.indexOf(value) === -1);
}

export default function GroupsField({
	name,
	helpTextTitle,
	helpText,
	groups,
	handleChange,
	modifiable,
	addTitle,
	deleteTitle,
}: props) {
	const { groups: availableGroupsForRealm } = useGetGroups('RP');
	const [possibleGroups, setPossibleGroups] = useState<string[]>([]);
	const [application, setApplication] = useState<string | undefined>(
		undefined,
	);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		setPossibleGroups(
			not(
				availableGroupsForRealm.map((group) => group.name),
				groups,
			),
		);
	}, [groups, availableGroupsForRealm]);

	const handleClickAdd = (pos: number) => {
		groups.push(possibleGroups[pos]);
		handleChange(groups);
	};

	const handleClickDelete = (pos: number) => {
		groups.splice(pos, 1);
		handleChange(groups);
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
									{addTitle}
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<List dense>
									{possibleGroups?.map(
										(value, pos) => {
											const labelId = `checkbox-list-label-role-${value}`;
											return (
												<ListItem>
													<ListItemText
														id={
															labelId
														}
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
										},
									)}
									{possibleGroups.length ===
									0 ? (
										<ListItem>
											Aucun groupe
											disponible
										</ListItem>
									) : null}
								</List>
							</Grid>
							<TextField
								variant="outlined"
								label={name}
								name={name}
								disabled={!modifiable}
								value={application || ''}
								fullWidth
								onChange={(e) =>
									setApplication(
										e.target.value,
									)
								}
							/>
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
									{deleteTitle}
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<List dense={true}>
									{groups.map(
										(
											group: string,
											pos: any,
										) => (
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
				</>
			) : null}
		</Grid>
	);
}
