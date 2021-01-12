import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../api';
import Title from '../commons/title/title';
import SearchForm from './formular/SearchFormular';
import { SearchResults } from './searchResults/searchResults';
import useGetUsers from '../../hooks/user/useGetUsers';
import { useForms } from '../../hooks/technics/useForms';
import useGetOrganizations from '../../hooks/organization/useGetOrganizations';

interface formValues {
	realm: string;
	type: 'user' | 'organization';
}

const Search = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { realm } = useParams<any>();
	const [values, setValues] = useState<formValues>({} as formValues);
	const { loading, users, error, execute } = useGetUsers(realm);
	const [type, setType] = useState<'Users' | 'Organizations'>('Users');
	const {
		loading: loadingOrga,
		organization,
		error: errorOrga,
		execute: executeOrga,
	} = useGetOrganizations();

	const submit = (type: 'Users' | 'Organizations', values: any) => {
		setType(type);
		if (type === 'Users') {
			execute(realm, { ...values });
		}
		if (type === 'Organizations') {
			executeOrga(realm, { ...values });
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
						data={users}
						realm={realm}
						type={type}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Search;
