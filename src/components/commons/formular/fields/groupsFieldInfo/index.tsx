import { Chip, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PeopleIcon from '@material-ui/icons/People';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetApplication } from '../../../../../hooks/api/applications/useGetApplication';
import { Group } from '../../../../../model/api/group';
import PopIcon from '../../../popIcon/popIcon';
import AutoCompleteApplication from './autocompleteApplication';
import ManageGroup from './manageGroup';

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
	const { realm } = useParams<any>();

	const { application, execute: searchApplication } = useGetApplication();

	const [applicationName, setApplicationName] = useState<
		String | undefined
	>();

	const handleChangeOnApp = (application: string) => {
		if (application) {
			setApplicationName(application);
			searchApplication(realm, application);
		}
	};

	const [edit, setEdit] = useState(false);

	const handleClickAdd = (group: string) => {
		groups.push({ name: group });
		handleChange(groups);
	};

	const handleClickDelete = (group: string) => {
		handleChange(
			groups
				.filter((_group: any) => _group !== null)
				.filter((_group: any) => group !== _group.name),
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
								<Grid
									container
									direction="column"
									justify="center"
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
												application?.groups
											}
											groups={
												groups
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
							justify="center"
							alignItems="stretch"
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography
									align="left"
									variant="subtitle1"
								>
									{deleteTitle}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Grid
									container
									direction="row"
									justify="flex-start"
									alignItems="stretch"
									spacing={2}
								>
									{groups
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
							</Grid>
						</Grid>
					</Grid>
				</>
			) : (
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="stretch"
						spacing={1}
					>
						{groups
							?.filter(
								(group: Group) =>
									group !== null,
							)
							.map((group: Group, i: any) => (
								<Grid item key={'groups_' + i}>
									<Chip
										color="default"
										size="small"
										icon={
											<PeopleIcon />
										}
										clickable={false}
										label={group.name}
									/>
								</Grid>
							))}
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
