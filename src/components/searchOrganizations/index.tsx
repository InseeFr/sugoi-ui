import { Button, Grid, LinearProgress } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import useGetOrganizations from '../../hooks/organization/useGetOrganizations';
import { SearchResults } from '../commons/searchResults';
import Title from '../commons/title/title';
import SearchForm from '../commons/searchFormular';
import Organization from '../../model/api/organization';
import { useSnackbar } from 'notistack';

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
	];

	return (
		<>
			<Title title={t('search_organization.title') + realm} />
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
						formFields={[]}
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
