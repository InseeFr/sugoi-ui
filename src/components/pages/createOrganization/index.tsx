import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import DataViewer from 'src/components/shared/dataViewer/dataviewer';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';
import { usePostOrganization } from 'src/lib/hooks/api-hooks';
import useRealmConfig from 'src/lib/hooks/realm/useRealmConfig';
import { useForms } from 'src/lib/hooks/technics/useForms';

const CreateOrganization = () => {
	const { realm, userStorage } = useParams() as {
		realm: string;
		userStorage: string;
	};
	const navigate = useNavigate();
	const { formValues, handleChange, handleReset, errors, handleSubmit } =
		useForms({});
	const { organizationConfig } = useRealmConfig(realm);
	const { execute: createOrganization, loading } = usePostOrganization();

	const { t } = useTranslation();

	const onSubmit = () =>
		createOrganization(formValues, realm, userStorage).then(
			(organization) =>
				organization &&
				navigate(
					'/realm/' +
						realm +
						'/us/' +
						userStorage +
						'/organizations/' +
						organization.identifiant,
				),
		);

	const handleCreate = () => {
		handleSubmit(organizationConfig)(onSubmit);
	};

	useEffect(() => {
		document.title = t('create_organization.page_title');
	}, [t]);

	return (
		<Grid container spacing={2} sx={{ flexDirection: 'column' }}>
			<Grid size={12}>
				<Title title={t('create_organization.title') + realm} />
			</Grid>
			<Grid size={12}>
				<DataViewer
					data={formValues}
					fieldToDisplay={organizationConfig}
					handleChange={handleChange}
					create={true}
					errors={errors}
					buttons={
						<Grid size={12}>
							<Grid
								container
								direction="row"
								sx={{
									justifyContent: 'center',
								}}
								spacing={3}
							>
								<Grid>
									<LoadingButton
										handleClick={
											handleCreate
										}
										loading={loading}
										color="primary"
										variant="contained"
									>
										{t(
											'create_organization.buttons.save',
										)}
									</LoadingButton>
								</Grid>

								<Grid>
									<Button
										variant="contained"
										onClick={
											handleReset
										}
									>
										{t(
											'create_organization.buttons.reset',
										)}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					}
				/>
			</Grid>
		</Grid>
	);
};

export default CreateOrganization;
