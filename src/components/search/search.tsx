import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../api/api';
import Title from '../commons/title/title';
import SearchForm from './formular/card-formular';
import { SearchResults } from './searchResults/searchResults';

interface formValues {
	Domaine: string;
}

const Search = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { realm } = useParams<any>();
	const [values, setValues] = useState<formValues | null>(null);
	const [users, setUsers] = useState<any[]>([]);
	const [, setLoading] = useState(false);
	useEffect(() => {
		if (values) {
			setLoading(true);
			getUsers(realm)
				.then((r) => {
					setUsers(r);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					enqueueSnackbar('Api indisponible', {
						variant: 'error',
						persist: true,
					});
				});
		}
	}, [values, realm, enqueueSnackbar]);

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
					<SearchForm setValues={setValues} />
				</Grid>
				<Grid item xs={12}>
					<SearchResults datasource={users} />
				</Grid>
			</Grid>
		</>
	);
};

export default Search;
