import {
	Button,
	Chip,
	CircularProgress,
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
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetUser from '../../../../../hooks/api/user/useGetUser';
import {
	useAddAttribute,
	useDeleteAttribute,
} from '../../../../../hooks/api/user/useManageAttributes';
import PopIcon from '../../../../commons/popIcon/popIcon';
import get from 'lodash.get';
import LoadingButton from '../../../loadingButton';

interface props {
	value: any;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
	attribute_key: string;
}

const SimpleAppManagedAttributes = ({
	name,
	helpTextTitle,
	helpText,
	value,
	modifiable,
	addTitle,
	deleteTitle,
	attribute_key,
}: props) => {
	const { realm, userStorage, id } = useParams<any>();

	const [newValue, setNewValue] = React.useState<any>();
	const [edit, setEdit] = React.useState(false);
	const { execute, loading: loadingAdd } = useAddAttribute(attribute_key);
	const {
		execute: executeDelete,
		loading: loadingDelete,
	} = useDeleteAttribute(attribute_key);
	const { user, execute: executeUser, loading: loadingUser } = useGetUser(
		id,
		realm,
		userStorage,
	);
	console.log(value, get(user, value, []));
	const add = () => {
		execute(realm, id, newValue).finally(() => {
			setNewValue(undefined);
			executeUser(id, realm, userStorage);
		});
	};

	const delet = (pos: number) => {
		get(user, value, [])[pos] &&
			executeDelete(realm, id, get(user, value, [])[pos]).finally(
				() => {
					executeUser(id, realm, userStorage);
				},
			);
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
			{!edit ? (
				<Grid item xs={12}>
					{loadingUser ? (
						<CircularProgress />
					) : (
						<Grid
							container
							direction="row"
							justify="flex-start"
							alignItems="stretch"
							spacing={1}
						>
							{loadingUser ? (
								<CircularProgress />
							) : (
								get(user, value, [])?.map(
									(val: any, i: any) => (
										<Grid item>
											<Chip
												key={
													'list_' +
													{
														name,
													} +
													'_' +
													i
												}
												color="default"
												size="small"
												clickable={
													false
												}
												label={
													val
												}
											/>
										</Grid>
									),
								)
							)}
						</Grid>
					)}
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
										disabled={
											loadingAdd
										}
									/>
									<PopIcon
										helpText={helpText}
									/>
								</div>
							</Grid>
							<Grid item>
								<LoadingButton
									variant="contained"
									color="primary"
									handleClick={add}
									loading={loadingAdd}
								>
									Ajouter
								</LoadingButton>
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
								{loadingUser ? (
									<CircularProgress />
								) : (
									<List dense={true}>
										{get(
											user,
											value,
											[],
										).map(
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
															disabled={
																loadingDelete
															}
														>
															<DeleteIcon />
															{loadingDelete && (
																<CircularProgress />
															)}
														</IconButton>
													</ListItemSecondaryAction>
												</ListItem>
											),
										)}
									</List>
								)}
							</Grid>
						</Grid>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};

export default SimpleAppManagedAttributes;
