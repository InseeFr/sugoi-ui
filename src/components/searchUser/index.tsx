import { Grid, IconButton, LinearProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useGetUsers from '../../hooks/user/useGetUsers';
import Title from '../commons/title/title';
import { SearchResults } from '../commons/searchResults';
import SearchForm from './../commons/searchFormular';
import { field } from '../../model/field';

const formFields: field[] = [
	{
		name: 'Identifiant',
		helpTextTitle: 'Identifiant',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin de l'identifiant recherché. L'identifiant d'un contact/d'une organisation est unique dans l'annuaire. La recherche sera plus précise.",
		path: 'identifiant',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Description',
		helpTextTitle: 'Description',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin du nom commun recherché. Caractères autorisés : alphabétiques, chiffres, apostrophes, espaces, tirets",
		path: 'description',
		type: 'string',
		modifiable: true,
	},
	{
		name: "Organisation d'appartenance",
		helpTextTitle: " Identifiant de l'organisation d'appartenance ",
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement.  Le champ saisi doit être le début de l'identifiant recherché.",
		type: 'string',
		modifiable: true,
		path: 'organization',
	},
	{
		name: 'Nom commun',
		helpTextTitle: ' Nom commun',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin du nom commun recherché. Caractères autorisés : alphabétiques, chiffres, apostrophes, espaces, tirets",
		path: 'nomCommun',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Adresse e-mail',
		helpTextTitle: ' Adresse e-mail ',
		helpText:
			"Le champ saisi peut être une portion de l'adresse mail recherchée.",
		path: 'description',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Certificat associé',
		helpTextTitle: 'Certificat associé',
		path: 'certificate',
		type: 'string',
		modifiable: true,
	},
];

const SearchUsers = () => {
	const { realm } = useParams<any>();
	const { users, execute: searchUsers, loading } = useGetUsers(realm);
	const { push } = useHistory();

	const submit = (values: any) => {
		searchUsers(realm, { ...values });
	};

	const columns = [
		{
			name: 'username',
			label: 'Username',
		},
		{
			name: 'mail',
			label: 'Email',
		},
		{
			name: 'lastName',
			label: 'Nom commun',
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
									'user/' +
									users[dataIndex].username;

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
					'Rechercher un utilisateur dans le realm ' + realm
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
						formFields={formFields}
					/>
				</Grid>
				<Grid item xs={12}>
					<SearchResults data={users} columns={columns} />
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchUsers;
