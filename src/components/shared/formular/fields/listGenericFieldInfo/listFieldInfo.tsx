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
	Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import PopIcon from 'src/components/shared/popIcon/popIcon';
import CreateIcon from '@mui/icons-material/Create';
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
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
				</Box>
			</Grid>
			{!edit && value.length > 0 ? (
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="stretch"
						spacing={1}
					>
						{value?.map((val: any, i: any) => (
							<Grid item key={i}>
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
							justifyContent="center"
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
								<Box
									sx={{
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
										helpTextTitle={
											helpTextTitle
										}
										helpText={helpText}
									/>
								</Box>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									sx={{ float: 'right' }}
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
							justifyContent="center"
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
														size="large"
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
