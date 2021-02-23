import {
	Button,
	Chip,
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
import PopIcon from '../../../../commons/popIcon/popIcon';
import CreateIcon from '@material-ui/icons/Create';
interface props {
	value: any;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	handleChange: any;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
}

const ListFieldInfoPopup = ({
	name,
	helpTextTitle,
	helpText,
	value,
	handleChange,
	modifiable,
	addTitle,
	deleteTitle,
}: props) => {
	const [newValue, setNewValue] = React.useState<any>();
	const [edit, setEdit] = React.useState(false);
	const add = () => {
		if (newValue) {
			value.push(newValue);
			handleChange(value);
			setNewValue(undefined);
		}
	};

	const delet = (pos: number) => {
		value.splice(pos, 1);
		handleChange(value);
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
			{!edit && value.length > 0 ? (
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="stretch"
						spacing={1}
					>
						{value?.map((val: any, i: any) => (
							<Grid item>
								<Chip
									key={
										'list_' +
										{ name } +
										'_' +
										i
									}
									color="default"
									size="small"
									clickable={false}
									label={val}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
			) : null}
			{edit && modifiable ? (
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
									variant="subtitle2"
								>
									{addTitle}
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<div
									style={{
										display: 'flex',
										alignItems:
											'center',
									}}
								>
									<TextField
										variant="outlined"
										label={name}
										name={name}
										value={
											newValue || ''
										}
										fullWidth
										onChange={(e) =>
											setNewValue(
												e.target
													.value,
											)
										}
									/>
									<PopIcon
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

					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="stretch"
							spacing={2}
						>
							<>
								<Grid item>
									<Typography
										align="left"
										variant="subtitle2"
									>
										{deleteTitle}
									</Typography>
								</Grid>
								<Grid item>
									<Divider />
								</Grid>
							</>
							<Grid item>
								<List dense={true}>
									{value.map(
										(
											item: string,
											pos: any,
										) => (
											<ListItem
												key={
													'list-propriete-item-' +
													pos
												}
											>
												<ListItemText
													primary={
														item
													}
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
				</>
			) : null}
		</Grid>
	);
};

export default ListFieldInfoPopup;
