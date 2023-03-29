import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import {
	useGetUsers,
	useRealmConfig,
	useGetOrganizations,
	useGetApplications,
} from 'src/lib/hooks/api-hooks';
import { Description } from 'src/components/shared/description';
import Title from 'src/components/shared/title/title';
import MyAutocomplete from './my_autocomplete';

const AutoCompleteUsers = ({ realm, userStorage }: any) => {
	const { push } = useHistory();
	const { t } = useTranslation();

	const {
		users,
		loading: loadingUsers,
		execute: getUsers,
	} = useGetUsers(realm, userStorage);

	return (
		<>
			<Typography component="div" color="primary" variant="body1">
				<Box fontWeight="fontWeightBold">
					{t('global_search.user_quick_search_title')}
				</Box>
			</Typography>
			<MyAutocomplete
				text="id, mail,..."
				options={users.map((user, i) => {
					return {
						label:
							(user?.username || '') +
							' - ' +
							(user?.mail || '') +
							' - ' +
							(user?.lastName || '') +
							' ' +
							(user?.firstName || ''),
						payload: user,
						id: i,
					};
				})}
				loading={loadingUsers}
				inputChange={(value: any) => {
					getUsers(
						{
							identifiant: value,
							mail: value,
							typeRecherche: 'OR',
						},
						realm,
						userStorage,
					);
				}}
				onChange={(value: any) => {
					value &&
						push(
							'/realm/' +
								realm +
								'/users/' +
								value.payload.username,
						);
				}}
			/>
		</>
	);
};

const AutoCompleteApplications = ({ realm }: any) => {
	const {
		applications,
		loading: loadingApplications,
		execute: getApplications,
	} = useGetApplications(realm);

	const { t } = useTranslation();
	const { push } = useHistory();

	return (
		<>
			<Typography component="div" color="primary" variant="body1">
				<Box fontWeight="fontWeightBold">
					{t(
						'global_search.application_quick_search_title',
					)}
				</Box>
			</Typography>
			<MyAutocomplete
				text="nom"
				options={applications.map((app, i) => {
					return { label: app?.name, payload: app, id: i };
				})}
				loading={loadingApplications}
				inputChange={(value: string) => {
					getApplications(realm, value);
				}}
				onChange={(value: any) =>
					push(
						'/realm/' +
							realm +
							'/applications/' +
							value.payload.name,
					)
				}
			/>
		</>
	);
};

const AutocompleteOrganizations = ({ realm, userStorage }: any) => {
	const {
		organizations,
		loading: loadingOrganizations,
		execute: getOrganizations,
	} = useGetOrganizations(realm, userStorage);
	const { t } = useTranslation();
	const { push } = useHistory();

	return (
		<>
			<Typography component="div" color="primary" variant="body1">
				<Box fontWeight="fontWeightBold">
					{t(
						'global_search.organization_quick_search_title',
					)}
				</Box>
			</Typography>
			<MyAutocomplete
				text="id, mail,..."
				options={organizations.map((orga, i) => {
					return {
						label:
							(orga?.identifiant || '') +
							' - ' +
							(orga?.attributes?.mail || ''),
						payload: orga,
						id: i,
					};
				})}
				loading={loadingOrganizations}
				inputChange={(value: string) => {
					getOrganizations(
						realm,
						{
							identifiant: value,
							mail: value,
							typeRecherche: 'OR',
						},
						userStorage,
					);
				}}
				onChange={(value: any) =>
					push(
						'/realm/' +
							realm +
							'/organizations/' +
							value.identifiant,
					)
				}
			/>
		</>
	);
};

export const RealmHome = () => {
	const { realm, userStorage } = useParams<any>();
	const { t } = useTranslation();
	document.title =
		t('global_search.page_title_1') +
		realm +
		t('global_search.page_title_2');
	const { hasApplication, hasOrganisation } = useRealmConfig(
		realm,
		userStorage,
	);

	return (
		<>
			<Title
				title={
					t('global_search.title') +
					realm +
					(userStorage
						? t('global_search.title_next') +
						  userStorage
						: '')
				}
			/>

			<Grid container direction="row" spacing={2}>
				<Grid item xs={12}>
					<Description realmName={realm} />
				</Grid>
				<Grid item xs={12}>
					<AutoCompleteUsers
						realm={realm}
						userStorage={userStorage}
					/>
				</Grid>
				{hasOrganisation && (
					<Grid item xs={12}>
						<AutocompleteOrganizations
							realm={realm}
							userStorage={userStorage}
						/>
					</Grid>
				)}
				{hasApplication && (
					<Grid item xs={12}>
						<AutoCompleteApplications realm={realm} />
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default RealmHome;
