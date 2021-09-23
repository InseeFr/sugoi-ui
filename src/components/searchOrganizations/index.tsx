import { Grid, IconButton, LinearProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import useGetOrganizations from '../../hooks/organization/useGetOrganizations';
import { Field } from '../../model/field';
import SearchForm from '../commons/searchFormular';
import { SearchResults } from '../commons/searchResults';
import Title from '../commons/title/title';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import { ButtonDescription } from '../commons/description';

const SearchOrganizations = () => {
	const { realm, userStorage } = useParams<any>();
	const { enqueueSnackbar } = useSnackbar();
	const { push } = useHistory();
	const { t } = useTranslation();

	const {
		organizations,
		execute: searchOrganizations,
		loading,
	} = useGetOrganizations(realm, userStorage);

	const handleSearch = (values: any) => {
		searchOrganizations(realm, { ...values }, userStorage);
	};

	const handleCreate = () => {
		if (userStorage) {
			push(
				'/realm/' +
					realm +
					'/us/' +
					userStorage +
					'/organizations/create',
			);
		} else {
			enqueueSnackbar(t('search_user.info_create'), {
				variant: 'info',
			});
		}
	};

	const handleClickOnOrganization = (organizationId: string) => {
		push(
			userStorage
				? '/realm/' +
						realm +
						'/us/' +
						userStorage +
						'/organizations/' +
						organizationId
				: '/realm/' +
						realm +
						'/' +
						'organizations/' +
						organizationId,
		);
	};

	const columns = [
		{
			name: 'identifiant',
			label: 'Identifiant',
		},
		{
			name: 'attributes',
			label: 'Email',
			options: {
				customBodyRender: (value: any) => value.mail,
			},
		},
		{
			name: 'attributes',
			label: 'Description',
			options: {
				customBodyRender: (value: any) => value.description,
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

	const formFields: Field[] = [
		{
			name: t('search_organization.form.field.identifiant.name'),
			helpTextTitle: t(
				'search_organization.form.field.identifiant.help_text_title',
			),
			helpText: t(
				'search_organization.form.field.identifiant.help_text',
			),
			path: 'identifiant',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
		{
			name: t('search_organization.form.field.email.name'),
			helpTextTitle: t(
				'search_organization.form.field.email.help_text_title',
			),
			helpText: t('search_organization.form.field.email.help_text'),
			path: 'mail',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
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
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<Title
						title={
							t('search_organization.title') + realm
						}
					/>
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
						realm={realm}
						userStorage={userStorage}
						onSubmit={handleSearch}
						formFields={formFields}
					/>
				</Grid>
				<Grid item xs={12}>
					<SearchResults
						data={organizations}
						columns={columns}
						handleClickAdd={handleCreate}
						handleClickOnRow={handleClickOnOrganization}
					/>
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchOrganizations;
