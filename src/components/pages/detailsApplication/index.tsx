import { Grid, TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationPopup from 'src/components/shared/confirmationPopUp';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';
import {
	useCreateGroup,
	useDeleteApplication,
	useGetApplication,
	useGetGroupManager,
} from 'src/lib/hooks/api-hooks';
import { Group } from 'src/lib/model/api/group';
import ButtonCreateGroup from './ButtonCreateGroup';
import { ButtonDeleteGroup } from './ButtonDeleteGroup';
import { ButtonManageGroupSettings } from './ButtonManageGroupSettings';
import {
	ButtonManageGroupMembers,
	ButtonManageManagerGroupMembers,
} from './ButtonManageGroupMembers';
import { GroupsViewer } from './groupsViewer';
import { useState } from 'react';
import { ContactsManager } from './ContactsManager';
import { ApplicationSettings } from './ApplicationSettings';
import { ButtonExportGroupUsers } from './ButtonExportGroupUsers';
export const DetailsApplication = () => {
	const [groupeApplicatif, setGroupeApplicatif] = useState('');
	const { realm, id: applicationId } = useParams() as {
		realm: string;
		id: string;
	};
	const navigate = useNavigate();
	const { t } = useTranslation();
	document.title =
		t('detail_application.page_title_1') +
		applicationId +
		t('detail_application.page_title_2');
	const {
		application,
		execute: getApplication,
		loading,
	} = useGetApplication(realm, applicationId);

	const {
		execute: getGroupManager,
		group: groupManager,
		loading: loadingGroupManager,
	} = useGetGroupManager(realm, applicationId);

	const { execute: createGroup } = useCreateGroup();

	const { execute: deleteApplication, loading: loadingDelete } =
		useDeleteApplication();

	const handleDeleteApp = async () => {
		await deleteApplication(realm, applicationId);
		navigate('/realm/' + realm + '/applications');
	};

	const handleCreateGroup =
		(realm: string, applicationId: string) => (group: Group) => {
			createGroup(realm, applicationId, group).then(() =>
				getApplication(realm, applicationId),
			);
		};

	return (
		<>
			<Title
				title={t('detail_application.title') + applicationId}
			/>
			<Grid container direction="column" spacing={5}>
				<Grid container item direction="column" spacing={3}>
					<Grid item>
						<Title
							title={t(
								'detail_application.manager_groups_title',
							)}
							variant="subtitle1"
						/>
					</Grid>
					<Grid item>
						<GroupsViewer
							groups={
								groupManager
									? [groupManager]
									: []
							}
							paginate={false}
							realm={realm}
							loading={loadingGroupManager}
							updateManageGroupMembers={(
								_group: Group,
							) => (
								<ButtonManageManagerGroupMembers
									realm={realm}
									applicationName={
										applicationId
									}
									groupName={_group.name}
									onClose={() =>
										getGroupManager(
											realm,
											applicationId,
										)
									}
								/>
							)}
						/>
					</Grid>
				</Grid>

				<Grid container item direction="column" spacing={2}>
					<Grid item>
						<Title
							title={t(
								'detail_application.groups_title',
							)}
							variant="subtitle1"
						/>
					</Grid>
					<Grid
						xs={12}
						direction="row"
						item
						container
						spacing={2}
						justifyContent="space-between"
						alignItems="stretch"
					>
						<Grid item xs={8}>
							<TextField
								fullWidth
								id="standard-bare"
								label={t(
									'detail_application.search_groups_title',
								)}
								variant="outlined"
								value={groupeApplicatif}
								inputProps={{
									style: {
										fontSize: 20,
									},
								}}
								onChange={(e) =>
									setGroupeApplicatif(
										e.target.value,
									)
								}
								InputProps={{
									endAdornment: (
										<IconButton size="medium">
											<SearchOutlined />
										</IconButton>
									),
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<ButtonCreateGroup
								handleAddGroup={handleCreateGroup(
									realm,
									applicationId,
								)}
								application={application}
							/>
						</Grid>
					</Grid>
					<Grid
						xs={12}
						direction="row"
						container
						spacing={2}
						item
					>
						<Grid item xs={12}>
							<GroupsViewer
								groups={
									application?.groups.filter(
										(group) =>
											group.name
												.toLowerCase()
												.includes(
													groupeApplicatif.toLowerCase(),
												),
									) || []
								}
								realm={realm}
								loading={loading}
								updateManageGroupMembers={(
									_group: Group,
								) => (
									<ButtonManageGroupMembers
										realm={realm}
										applicationName={
											applicationId
										}
										groupName={
											_group.name
										}
										onClose={() =>
											getApplication(
												realm,
												applicationId,
											)
										}
									/>
								)}
								updateManageGroupSettings={(
									_group: Group,
								) => (
									<ButtonManageGroupSettings
										realm={realm}
										applicationName={
											applicationId
										}
										group={_group}
									/>
								)}
								deleteComponent={(
									_group: Group,
								) => (
									<ButtonDeleteGroup
										group={_group}
										realm={realm}
										application={
											applicationId
										}
										onClose={() =>
											getApplication(
												realm,
												applicationId,
											)
										}
									/>
								)}
								exportComponent={(
									_group: Group,
								) => (
									<ButtonExportGroupUsers
										realm={realm}
										application={
											applicationId
										}
										group={_group}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Grid>
				<ContactsManager
					application={application}
					getApplication={getApplication}
					realm={realm}
				/>
				<Grid item>
					{application && (
						<ApplicationSettings
							application={application}
							realm={realm}
						/>
					)}
				</Grid>
				<Grid item>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={3}
					>
						<Grid item>
							<ConfirmationPopup
								Icon={
									<LoadingButton
										loading={
											loadingDelete
										}
										color="secondary"
										variant="contained"
									>
										{t(
											'detail_application.buttons.delete.button',
										)}
									</LoadingButton>
								}
								title={
									t(
										'detail_application.buttons.delete.popup.title.part1',
									) +
									applicationId +
									t(
										'detail_application.buttons.delete.popup.title.part2',
									)
								}
								body1={t(
									'detail_application.buttons.delete.popup.body.body1',
								)}
								body2={t(
									'detail_application.buttons.delete.popup.body.body2',
								)}
								bodyBold={t(
									'detail_application.buttons.delete.popup.body.bodyBold',
								)}
								validation_text={applicationId}
								handleDelete={() =>
									handleDeleteApp()
								}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
