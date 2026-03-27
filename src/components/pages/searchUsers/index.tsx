import { Chip, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { ButtonDescription } from 'src/components/shared/description';
import SearchForm from 'src/components/shared/searchFormular';
import { SearchResults } from 'src/components/shared/searchResults';
import Title from 'src/components/shared/title/title';
import { exportUser } from 'src/lib/api/remote';
import { useGetUsers } from 'src/lib/hooks/api-hooks';
import { Field } from 'src/lib/model/field';
import SearchRequestUser from 'src/lib/model/js/searchRequestUser';
import { download } from 'src/lib/utils/downloadFile';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import User from 'src/lib/model/api/user';

const SearchUsers = () => {
	const accessToken = useOidcAccessToken().accessToken;
	const { realm, userStorage } = useParams() as {
		realm: string;
		userStorage?: string;
	};
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [lastSearch, setLastSearch] = useState({});

	const { t } = useTranslation();
	document.title = t('search_user.page_title');

	const { users, execute: searchUsers } = useGetUsers(realm, userStorage);

	const handleSearch = (values: any) => {
		let toSearch: SearchRequestUser = {};
		if (values?.global) {
			toSearch = {
				identifiant: values.global,
				mail: values.global,
				commonName: values.global,
				typeRecherche: 'OR',
			};
		} else {
			toSearch = { ...values };
		}
		setLastSearch(toSearch);
		searchUsers({ ...toSearch }, realm, userStorage);
	};

	const handleClickOnUser = (user: User) => {
		navigate(
			userStorage
				? '/realm/' +
						realm +
						'/us/' +
						userStorage +
						'/users/' +
						user.username
				: '/realm/' + realm + '/' + 'users/' + user.username,
		);
	};

	const handleCreate = () => {
		if (userStorage) {
			navigate(
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

	const handleExport = () => {
		exportUser(realm, { ...lastSearch }, userStorage, accessToken).then(
			(r) => download(r, 'export.csv', 'text/csv;charset=utf-8;'),
		);
	};

	const formFields: Field[] = [
		{
			name: t('search_user.form.field.global.name'),
			helpTextTitle: t(
				'search_user.form.field.global.help_text_title',
			),
			helpText: t('search_user.form.field.global.help_text'),
			path: 'global',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
	];

	const formFieldsAdvanced: Field[] = [
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
		{
			name: t('search_user.form.field.commun_name.name'),
			helpTextTitle: t(
				'search_user.form.field.commun_name.help_text_title',
			),
			helpText: t('search_user.form.field.commun_name.help_text'),
			path: 'commonName',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
		{
			name: t('search_user.form.field.last_name.name'),
			helpTextTitle: t(
				'search_user.form.field.last_name.help_text_title',
			),
			helpText: t('search_user.form.field.last_name.help_text'),
			path: 'lastName',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
		{
			name: t('search_user.form.field.first_name.name'),
			helpTextTitle: t(
				'search_user.form.field.first_name.help_text_title',
			),
			helpText: t('search_user.form.field.first_name.help_text'),
			path: 'firstName',
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
			name: t('search_user.form.field.habilitation.name'),
			helpTextTitle: t(
				'search_user.form.field.habilitation.help_text_title',
			),
			helpText: t('search_user.form.field.habilitation.help_text'),
			path: 'habilitation',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
	];

	const columns = [
		{
			accessorKey: 'username',
			header: 'Identifiant',
		},
		{
			accessorKey: 'firstName',
			header: 'Prénom',
		},
		{
			accessorKey: 'lastName',
			header: 'Nom',
		},
		{
			accessorKey: 'mail',
			header: 'Email',
		},
		{
			accessorKey: 'attributes.common_name',
			header: 'Nom Commun',
			valueGetter: (cell: any) => cell.value.common_name,
		},
		{
			accessorKey: 'habilitations',
			header: 'Habilitations',
			Cell: ({ cell }: any) => {
				const value = cell.getValue();
				return (
					<Typography>
						{value &&
							value.map((v: any) => (
								<Chip
									key={'hab_' + v.id}
									label={v.id}
									size="small"
								/>
							))}
					</Typography>
				);
			},
		},
		{
			accessorKey: 'groups',
			header: 'Groupes',
			Cell: ({ cell }: any) => {
				const value = cell.getValue();
				return (
					<Typography>
						{value &&
							value
								.filter((v: any) => v != null)
								.map((v: any) => (
									<Chip
										key={
											'group_' +
											v.name
										}
										label={v.name}
										size="small"
									/>
								))}
					</Typography>
				);
			},
		},
	];

	return (
		<>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid
					item
					xs={12}
					sx={{ display: 'flex', alignItems: 'center' }}
				>
					<Title title={t('search_user.title') + realm} />
					<ButtonDescription realmName={realm} />
				</Grid>
			</Grid>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid item xs={12}>
					<SearchForm
						handleClickAdd={handleCreate}
						onSubmit={handleSearch}
						formFields={formFields}
						formFieldsAdvanced={formFieldsAdvanced}
					/>
				</Grid>
				<Grid item xs={12}>
					<SearchResults
						data={users}
						columns={columns}
						handleClickOnRow={handleClickOnUser}
						handleDownload={handleExport}
						downloadable={true}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default SearchUsers;
