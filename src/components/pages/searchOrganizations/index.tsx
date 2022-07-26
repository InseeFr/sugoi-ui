import { Grid, IconButton } from '@mui/material';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonDescription } from 'src/components/shared/description';
import SearchForm from 'src/components/shared/searchFormular';
import { SearchResults } from 'src/components/shared/searchResults';
import Title from 'src/components/shared/title/title';
import { useGetOrganizations } from 'src/lib/hooks/api-hooks';
import { Field } from 'src/lib/model/field';
import searchRequestOrganization from 'src/lib/model/js/searchRequestOrganization';

const SearchOrganizations = () => {
	const { realm, userStorage } = useParams() as {
		realm: string;
		userStorage?: string;
	};
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const { t } = useTranslation();
	document.title = t('search_organization.page_title');

	const {
		organizations,
		execute: searchOrganizations,
		loading,
	} = useGetOrganizations(realm, userStorage);

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

	const handleClickOnOrganization = (organizationId: string) => {
		navigate(
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
		{
			name: '',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: function render(
					_dataIndex: any,
					_rowIndex: any,
				) {
					return (
						<IconButton
							aria-label="Détail"
							size="large"
						>
							<ZoomInOutlinedIcon />
						</IconButton>
					);
				},
			},
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
							loading={loading}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SearchOrganizations;
