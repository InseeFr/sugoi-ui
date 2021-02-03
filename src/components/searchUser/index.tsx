import { Button, Grid, LinearProgress } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import useGetUsers from '../../hooks/user/useGetUsers';
import { field } from '../../model/field';
import { SearchResults } from '../commons/searchResults';
import Title from '../commons/title/title';
import SearchForm from './../commons/searchFormular';

const SearchUsers = () => {
	const { realm } = useParams<any>();
	const { users, execute: searchUsers, loading } = useGetUsers(realm);
	const { push } = useHistory();
	const submit = (values: any) => {
		searchUsers(realm, { ...values });
	};

	const { t } = useTranslation();

	const formFields: field[] = [
		{
			name: t('search_user.form.field.identifiant.name'),
			helpTextTitle: t(
				'search_user.form.field.identifiant.help_text_title',
			),
			helpText: t('search_user.form.field.identifiant.help_text'),
			path: 'identifiant',
			type: 'string',
			modifiable: true,
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
		},
		{
			name: t('search_user.form.field.organization.name'),
			helpTextTitle: t(
				'search_user.form.field.organization.help_text_title',
			),
			helpText: t('search_user.form.field.organization.help_text'),
			type: 'string',
			modifiable: true,
			path: 'organization',
		},
		{
			name: t('search_user.form.field.commun_name.name'),
			helpTextTitle: t(
				'search_user.form.field.commun_name.help_text_title',
			),
			helpText: t('search_user.form.field.commun_name.help_text'),
			path: 'nomCommun',
			type: 'string',
			modifiable: true,
		},
		{
			name: t('search_user.form.field.email.name'),
			helpTextTitle: t(
				'search_user.form.field.email.help_text_title',
			),
			helpText: t('search_user.form.field.email.help_text'),
			path: 'description',
			type: 'string',
			modifiable: true,
		},
		{
			name: t('search_user.form.field.certificate.name'),
			helpTextTitle: t(
				'search_user.form.field.certificate.help_text_title',
			),
			path: 'certificate',
			type: 'string',
			modifiable: true,
		},
	];

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
			name: 'Actions',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: any) => {
					return (
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<Button
									disableElevation
									variant="contained"
									color="default"
									startIcon={<CreateIcon />}
									aria-label="modify user"
									onClick={() => {
										const link =
											'/realm/' +
											realm +
											'/' +
											'users/' +
											users[
												dataIndex
											].username;

										push(link);
									}}
								>
									{t(
										'search_user.buttons.edit',
									)}
								</Button>
							</Grid>
						</Grid>
					);
				},
			},
		},
	];

	return (
		<>
			<Title title={t('search_user.title') + realm} />
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
					<SearchResults
						data={users}
						columns={columns}
						handleClickAdd={() =>
							push(
								'/realm/' +
									realm +
									'/users/create',
							)
						}
					/>
					{loading ? <LinearProgress /> : null}
				</Grid>
			</Grid>
		</>
	);
};

export default SearchUsers;
