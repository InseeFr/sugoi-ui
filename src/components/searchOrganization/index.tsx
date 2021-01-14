import { Grid, IconButton, LinearProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React from 'react';
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
			name: 'Voir plus',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: any) => {
					return (
						<IconButton
							color="primary"
							aria-label="add to shopping cart"
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
							<VisibilityIcon />
						</IconButton>
					);
				},
			},
		},
	];

	return (
		<>
			<Title
				title={
					'Rechercher une organisation dans le realm ' +
					realm
				}
			/>
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
					/>
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchOrganizations;
