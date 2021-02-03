import { Button, Grid, LinearProgress } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import useGetOrganizations from '../../hooks/organization/useGetOrganizations';
import { SearchResults } from '../commons/searchResults';
import Title from '../commons/title/title';
import SearchForm from './../commons/searchFormular';

const SearchOrganizations = () => {
	const { realm } = useParams<any>();
	const {
		organizations,
		execute: searchOrganizations,
		loading,
	} = useGetOrganizations(realm);

	const { push } = useHistory();

	const submit = (values: any) => {
		searchOrganizations(realm, { ...values });
	};

	const { t } = useTranslation();

	const columns = [
		{
			name: 'identifiant',
			label: 'Identifiant',
		},
		{
			name: 'attributes',
			label: 'Email',
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any) => value.mail,
			},
		},
		{
			name: 'attributes',
			label: 'Description',
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any) => value.description,
			},
		},
		{
			name: 'Actions',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: any) => {
					return (
						<Button
							variant="contained"
							color="default"
							startIcon={<CreateIcon />}
							aria-label="modify user"
							onClick={() => {
								const link =
									'/realm/' +
									realm +
									'/' +
									'organization/' +
									organizations[dataIndex]
										.identifiant;

								push(link);
							}}
						>
							{t(
								'search_organization.buttons.edit',
							)}
						</Button>
					);
				},
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
						onSubmit={submit}
						formFields={[]}
					/>
				</Grid>
				<Grid item xs={12}>
					<SearchResults
						data={organizations}
						columns={columns}
						handleClickAdd={() =>
							push(
								'/realm/' +
									realm +
									'/organizations/create',
							)
						}
					/>
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchOrganizations;
