import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetOrganizations from '../../hooks/organization/useGetOrganizations';
import useGetUsers from '../../hooks/user/useGetUsers';
import Title from '../commons/title/title';
import SearchForm from './formular/SearchFormular';
import { SearchResults } from './searchResults/searchResults';

interface formValues {
	realm: string;
	type: 'user' | 'organization';
}

const Search = () => {
	const { realm } = useParams<any>();
	const { users, execute: searchUsers } = useGetUsers(realm);
	const [type, setType] = useState<'Users' | 'Organizations'>('Users');
	const {
		organizations,
		execute: searchOrganizations,
	} = useGetOrganizations();

	const submit = (type: 'Users' | 'Organizations', values: any) => {
		setType(type);
		if (type === 'Users') {
			searchUsers(realm, { ...values });
		}
		if (type === 'Organizations') {
			searchOrganizations(realm, { ...values });
		}
	};

	return (
		<>
			<Title title={'Rechercher dans le realm ' + realm} />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid item xs={12}>
					<SearchForm realm={realm} onSubmit={submit} />
				</Grid>
				<Grid item xs={12}>
					<SearchResults
						data={
							type === 'Users'
								? users
								: organizations
						}
						realm={realm}
						type={type}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Search;
