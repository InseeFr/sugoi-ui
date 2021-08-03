import { Button, Grid, IconButton, LinearProgress } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import useGetUsers from '../../hooks/user/useGetUsers';
import { Field } from '../../model/field';
import { SearchResults } from '../commons/searchResults';
import Title from '../commons/title/title';
import SearchForm from '../commons/searchFormular';
import { useSnackbar } from 'notistack';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import { ButtonDescription } from '../commons/description';
interface ParamTypes {
	realm: string;
	userStorage: string;
}

const SearchUsers = () => {
	const { realm, userStorage } = useParams<ParamTypes>();
	const { enqueueSnackbar } = useSnackbar();
	const { push } = useHistory();

	const { t } = useTranslation();

	const {
		users,
		execute: searchUsers,
		loading,
	} = useGetUsers(realm, userStorage);

	const handleSearch = (values: any) => {
		searchUsers({ ...values }, realm, userStorage);
	};

	const handleClickOnUser = (username: string) => {
		push(
			userStorage
				? '/realm/' +
						realm +
						'/us/' +
						userStorage +
						'/users/' +
						username
				: '/realm/' + realm + '/' + 'users/' + username,
		);
	};

	const handleCreate = () => {
		if (userStorage) {
			push(
				'/realm/' +
					realm +
					'/us/' +
					userStorage +
					'/users/create',
			);
		} else {
			enqueueSnackbar(t('search_user.info_create'), {
				variant: 'info',
			});
		}
	};

	const formFields: Field[] = [
		{
			name: t('search_user.form.field.identifiant.name'),
			helpTextTitle: t(
				'search_user.form.field.identifiant.help_text_title',
			),
			helpText: t('search_user.form.field.identifiant.help_text'),
			path: 'identifiant',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
		{
			name: t('search_user.form.field.description.name'),
			helpTextTitle: t(
				'search_user.form.field.description.help_text_title',
			),
			helpText: t('search_user.form.field.description.help_text'),
			path: 'description',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
		{
			name: t('search_user.form.field.organization.name'),
			helpTextTitle: t(
				'search_user.form.field.organization.help_text_title',
			),
			helpText: t('search_user.form.field.organization.help_text'),
			type: 'string',
			modifiable: true,
			path: 'organizationId',
			tag: '',
			options: {},
		},
		{
			name: t('search_user.form.field.commun_name.name'),
			helpTextTitle: t(
				'search_user.form.field.commun_name.help_text_title',
			),
			helpText: t('search_user.form.field.commun_name.help_text'),
			path: 'nomCommun',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
		{
			name: t('search_user.form.field.email.name'),
			helpTextTitle: t(
				'search_user.form.field.email.help_text_title',
			),
			helpText: t('search_user.form.field.email.help_text'),
			path: 'mail',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
	];

	const columns = [
		{
			name: 'username',
			label: 'Username',
		},
		{
			name: 'mail',
			label: 'Email',
		},
		{
			name: 'lastName',
			label: 'Nom commun',
		},
		{
			name: '',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (
					dataIndex: any,
					rowIndex: any,
				) => {
					return (
						<IconButton aria-label="Détail">
							<ZoomInOutlinedIcon />
						</IconButton>
					);
				},
			},
		},
	];

	return (
		<>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid
					item
					xs={12}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<Title title={t('search_user.title') + realm} />
					<ButtonDescription realmName={realm} />
				</Grid>
			</Grid>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid item xs={12}>
					<SearchForm
						realm={realm}
						userStorage={userStorage}
						onSubmit={handleSearch}
						formFields={formFields}
					/>
				</Grid>
				<Grid item xs={12}>
					<SearchResults
						data={users}
						columns={columns}
						handleClickAdd={handleCreate}
						handleClickOnRow={handleClickOnUser}
					/>
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchUsers;
