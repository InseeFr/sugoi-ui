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
import get from 'lodash.get';
import React from 'react';
import Organization from '../../../../model/organization';
import User from '../../../../model/user';
import PopButton from '../../popButton/popButton';
import PopIcon from '../../popIcon/popIcon';

interface props {
	data: User | Organization;
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

const ListFieldInfo = ({
	name,
	helpTextTitle,
	helpText,
	data,
	path,
	handleChange,
	modifiable,
	addTitle,
	deleteTitle,
}: props) => {
	const [newValue, setNewValue] = React.useState<any>();
	console.log(get(data, path, []));
	const add = () => {
		if (newValue) {
			const value = get(data, path, []);
			value.push(newValue);
			handleChange(path, value);
			setNewValue(undefined);
		}
	};

	const delet = (pos: number) => {
		const value = get(data, path, []);
		value.splice(pos, 1);
		handleChange(path, value);
	};

	return (
		<Grid container spacing={3}>
			{modifiable ? (
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
								Ajouter
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
									label={name}
									name={name}
									value={newValue || ''}
									fullWidth
									onChange={(e) =>
										setNewValue(
											e.target
												.value,
										)
									}
								/>
								<PopIcon
									helpTextTitle={
										helpTextTitle
									}
									helpText={helpText}
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
			) : null}
			<Grid item xs={12} md={6}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="stretch"
					spacing={2}
				>
					{modifiable ? (
						<>
							<Grid item>
								<Typography
									align="left"
									variant="subtitle1"
								>
									Supprimer
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
						</>
					) : null}
					<Grid item>
						<List dense={true}>
							{get(data, path, []).map(
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
										{modifiable ? (
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
										) : null}
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

export const ListFieldButton = ({
	name,
	helpTextTitle,
	helpText,
	textButton,
	data,
	path,
	handleChange,
	modifiable,
}: props) => {
	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography component="div" variant="body1">
					{name}
				</Typography>
				<PopIcon
					helpTextTitle={helpTextTitle}
					helpText={helpText}
				/>
				<div style={{ float: 'right' }}>
					<PopButton
						text={textButton || ''}
						title="Gestion habilitations"
						body={
							<ListFieldInfo
								name={name}
								helpText={helpText}
								helpTextTitle={helpTextTitle}
								modifiable={modifiable}
								data={data}
								handleChange={handleChange}
								path={path}
							/>
						}
						color="primary"
						variant="contained"
					/>
				</div>
			</div>
			<List dense={true}>
				{get(data, path, []).map((value: string) => (
					<ListItem disableGutters>
						<ListItemText primary={value} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default ListFieldButton;
