import {
	Chip,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	Typography,
	Box,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PopIcon from 'src/components/shared/popIcon/popIcon';
import {
	useAddGroupsToUser,
	useDeleteGroupsToUser,
	useGetApplication,
} from 'src/lib/hooks/api-hooks';
import useGetUser from 'src/lib/hooks/user/useGetUser';
import { Group } from 'src/lib/model/api/group';
import AutoCompleteApplication from './autocompleteApplication';
import ManageGroup from './manageGroup';

interface props {
	textButton?: string;
	helpText?: string;
	name?: string;
	modifiable: boolean;
}

export default function GroupsField({ name, helpText, modifiable }: props) {
	const { realm, userStorage, id } = useParams<any>();
	const {
		user,
		execute: executeUser,
		loading: loadingUser,
	} = useGetUser(id, realm, userStorage);

	const { application, execute: searchApplication } = useGetApplication();

	const [applicationName, setApplicationName] = useState<
		string | undefined
	>();

	const { execute: executeAdd, loading: loadingAdd } = useAddGroupsToUser();
	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteGroupsToUser();

	const handleChangeOnApp = (application: string) => {
		if (application) {
			setApplicationName(application);
			searchApplication(realm, application);
		}
	};

	const [edit, setEdit] = useState(false);

	const handleClickAdd = (group: string) => {
		applicationName &&
			executeAdd(realm, applicationName, group, id).finally(() => {
				executeUser(id, realm, userStorage);
			});
	};

	const handleClickDelete = (group: string) => {
		applicationName &&
			executeDelete(realm, applicationName, group, id).finally(
				() => {
					executeUser(id, realm, userStorage);
				},
			);
	};

	return (
		<Grid container spacing={3} sx={{ padding: 10 }}>
			<Grid item xs={12}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="subtitle1">
						{name}
					</Typography>
					<PopIcon helpText={helpText} />
					{modifiable && (
						<IconButton
							aria-label="info"
							size="small"
							onClick={() => setEdit(!edit)}
							color="primary"
						>
							<CreateIcon fontSize="inherit" />
						</IconButton>
					)}
				</Box>
			</Grid>
			{modifiable && edit ? (
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
									variant="subtitle1"
								>
									Ajout/Suppression de
									groupes
								</Typography>
							</Grid>
							<Grid item>
								<Divider />
							</Grid>
							<Grid item>
								<Grid
									container
									direction="column"
									justifyContent="center"
									alignItems="stretch"
									spacing={1}
								>
									<Grid item xs={12}>
										<AutoCompleteApplication
											application={
												applicationName
											}
											handleChangeApplication={
												handleChangeOnApp
											}
											realm={realm}
										/>
									</Grid>
									<Grid item xs={12}>
										<ManageGroup
											appGroups={
												application?.groups ||
												[]
											}
											groups={
												user?.groups ||
												[]
											}
											handleAdd={
												handleClickAdd
											}
											handleDelete={
												handleClickDelete
											}
										/>
									</Grid>
								</Grid>
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
							<Grid item xs={12}>
								<Typography
									align="left"
									variant="subtitle1"
								>
									Groupes
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								{loadingAdd ||
								loadingDelete ||
								loadingUser ? (
									<CircularProgress />
								) : (
									<Grid
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="stretch"
										spacing={2}
									>
										{user?.groups
											?.filter(
												(
													group: Group,
												) =>
													group !==
													null,
											)
											.map(
												(
													group: Group,
													i: any,
												) => (
													<Grid
														item
														key={
															i
														}
													>
														<Chip
															key={
																'group_' +
																i
															}
															color="default"
															size="small"
															icon={
																<PeopleIcon />
															}
															clickable={
																false
															}
															label={
																group.name
															}
														/>
													</Grid>
												),
											)}
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</>
			) : (
				<Grid item xs={12}>
					{loadingUser ? (
						<CircularProgress />
					) : (
						<Grid
							container
							direction="row"
							justifyContent="flex-start"
							alignItems="stretch"
							spacing={1}
						>
							{user?.groups
								?.filter(
									(group: Group) =>
										group !== null,
								)
								.map((group: Group, i: any) => (
									<Grid
										item
										key={'groups_' + i}
									>
										<Chip
											color="default"
											size="small"
											icon={
												<PeopleIcon />
											}
											clickable={
												false
											}
											label={
												group.name
											}
										/>
									</Grid>
								))}
						</Grid>
					)}
				</Grid>
			)}
		</Grid>
	);
}
