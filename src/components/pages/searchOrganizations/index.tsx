import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { ButtonDescription } from 'src/components/shared/description';
import SearchForm from 'src/components/shared/searchFormular';
import { SearchResults } from 'src/components/shared/searchResults';
import Title from 'src/components/shared/title/title';
import { useGetOrganizations } from 'src/lib/hooks/api-hooks';
import { Field } from 'src/lib/model/field';
import searchRequestOrganization from 'src/lib/model/js/searchRequestOrganization';
import Organization from 'src/lib/model/api/organization';

const SearchOrganizations = () => {
	const { realm, userStorage } = useParams() as {
		realm: string;
		userStorage?: string;
	};
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const { t } = useTranslation();
	document.title = t('search_organization.page_title');

	const { organizations, execute: searchOrganizations } =
		useGetOrganizations(realm, userStorage);

	const handleSearch = (values: any) => {
		let toSearch: searchRequestOrganization = {};
		if (values?.global) {
			toSearch = {
				identifiant: values.global,
				mail: values.global,
				typeRecherche: 'OR',
			};
		} else {
			toSearch = { ...values };
		}
		searchOrganizations(realm, { ...toSearch }, userStorage);
	};

	const handleCreate = () => {
		if (userStorage) {
			navigate(
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

	const handleClickOnOrganization = (organization: Organization) => {
		navigate(
			userStorage
				? '/realm/' +
						realm +
						'/us/' +
						userStorage +
						'/organizations/' +
						organization.identifiant
				: '/realm/' +
						realm +
						'/' +
						'organizations/' +
						organization.identifiant,
		);
	};

	const columns = [
		{
			accessorKey: 'identifiant',
			header: 'Identifiant',
		},
		{
			accessorKey: 'attributes.mail',
			header: 'Email',
		},
		{
			accessorKey: 'attributes.description',
			header: 'Description',
		},
	];

	const formFields: Field[] = [
		{
			name: t('search_organization.form.field.global.name'),
			helpTextTitle: t(
				'search_organization.form.field.global.help_text_title',
			),
			helpText: t(
				'search_organization.form.field.global.help_text',
			),
			path: 'global',
			type: 'string',
			modifiable: true,
			tag: '',
			options: {},
		},
	];

	const formFieldsAdvanced: Field[] = [
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
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<Title title={t('search_organization.title') + realm} />
				<ButtonDescription realmName={realm} />
			</Grid>

			<Grid item xs={12}>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12}>
						<SearchForm
							onSubmit={handleSearch}
							formFields={formFields}
							handleClickAdd={handleCreate}
							formFieldsAdvanced={
								formFieldsAdvanced
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<SearchResults
							data={organizations}
							columns={columns}
							handleClickOnRow={
								handleClickOnOrganization
							}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SearchOrganizations;
