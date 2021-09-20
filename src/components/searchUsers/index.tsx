import {
	Button,
	Chip,
	Grid,
	IconButton,
	LinearProgress,
	Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState } from 'react';
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
import { exportUser } from '../../api/remote';
import { download } from '../../utils/downloadFile';
interface ParamTypes {
	realm: string;
	userStorage: string;
}

const SearchUsers = () => {
	const { realm, userStorage } = useParams<ParamTypes>();
	const { enqueueSnackbar } = useSnackbar();
	const { push } = useHistory();

	const [lastSearch, setLastSearch] = useState({});

	const { t } = useTranslation();

	const {
		users,
		execute: searchUsers,
		loading,
	} = useGetUsers(realm, userStorage);

	const handleSearch = (values: any) => {
		setLastSearch(values);
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

	const handleExport = () => {
		exportUser(realm, { ...lastSearch }, userStorage).then((r) =>
			download(r, 'export.csv', 'text/csv;charset=utf-8;'),
		);
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
			path: 'CommonName',
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
			name: 'username',
			label: 'Identifiant',
		},
		{
			name: 'firstName',
			label: 'Prénom',
		},
		{
			name: 'lastName',
			label: 'Nom',
		},
		{
			name: 'mail',
			label: 'Email',
		},
		{
			name: 'attributes',
			label: 'Nom Commun',
			options: {
				filter: false,
				sort: true,
				customBodyRender: (
					value: any,
					tableMeta: any,
					updateValue: any,
				) => <Typography>{value.common_name}</Typography>,
			},
		},
		{
			name: 'habilitations',
			label: 'Habilitations',
			options: {
				filter: false,
				sort: true,
				customBodyRender: (
					value: any,
					tableMeta: any,
					updateValue: any,
				) => (
					<Typography>
						{value.map((v: any) => (
							<Chip
								key={'hab_' + v.id}
								label={v.id}
								size="small"
							/>
						))}
					</Typography>
				),
			},
		},
		{
			name: 'groups',
			label: 'Groupes',
			options: {
				filter: false,
				sort: true,
				customBodyRender: (
					value: any,
					tableMeta: any,
					updateValue: any,
				) => (
					<Typography>
						{value
							.filter((v: any) => v != null)
							.map((v: any) => (
								<Chip
									key={'group_' + v.name}
									label={v.name}
									size="small"
								/>
							))}
					</Typography>
				),
			},
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
						handleDownload={handleExport}
						downloadable={true}
					/>
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchUsers;
