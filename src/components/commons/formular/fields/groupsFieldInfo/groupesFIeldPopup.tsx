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
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import User from '../../../../../model/api/user';
import { useGetGroups } from '../../../../../hooks/group/useGetGroups';
import get from 'lodash.get';

interface props {
	data: User;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	path: string;
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
	data,
	path,
	handleChange,
	modifiable,
	addTitle,
	deleteTitle,
}: props) {
	const { groups: availableGroupsForRealm } = useGetGroups('RP');
	const [currentGroups, setCurrentGroups] = useState<string[]>([]);
	const [possibleGroups, setPossibleGroups] = useState<string[]>([]);
	const [state, setstate] = useState(1);

	useEffect(() => {
		if (state) {
			setCurrentGroups(get(data, path, []));
			setPossibleGroups(
				not(availableGroupsForRealm, get(data, path, [])),
			);
		}
	}, [data, path, state, availableGroupsForRealm]);

	const handleClickAdd = (pos: number) => {
		const value = get(data, path, []);
		value.push(possibleGroups[pos]);
		setstate(state + 1);
		handleChange(path, value);
	};

	const handleClickDelete = (pos: number) => {
		const value = get(data, path, []);
		value.splice(pos, 1);
		setstate(state + 1);
		handleChange(path, value);
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
							{addTitle}
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<List dense>
							{possibleGroups?.map((value, pos) => {
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
							{deleteTitle}
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
					</Grid>
					<Grid item>
						<List dense={true}>
							{get(data, path, []).map(
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
