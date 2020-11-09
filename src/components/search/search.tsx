import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../api/api';
import SearchForm from '../formular/card-formular';
import { SearchResults } from '../searchResults/searchResults';
import Notification from './../notification/notification';

interface formValues {
	Domaine: string;
}

const Search = () => {
	const [values, setValues] = useState<formValues | null>(null);
	const [users, setUsers] = useState<any[]>([]);
	const [, setLoading] = useState(false);
	const { realm } = useParams<any>();
	console.log(users);
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
					return Notification(
						'Erreur lors de la récupération des realms',
						err,
					);
				});
		}
	}, [values, realm]);

	return (
		<>
			<Typography variant="h2" component="h2">
				Realm {realm}
			</Typography>
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
				<Grid item>
					<SearchResults datasource={users} />
				</Grid>
			</Grid>
		</>
	);
};

export default Search;
