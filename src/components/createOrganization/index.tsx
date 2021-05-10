import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import usePostOrganization from '../../hooks/api/organization/usePostOrganization';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import Organization from '../../model/api/organization';
import DataViewer from '../commons/dataViewer/dataviewer';
import LoadingButton from '../commons/loadingButton';
import Title from '../commons/title/title';

const CreateOrganization = () => {
	const { realm, userStorage } = useParams<any>();
	const { push } = useHistory();
	const { formValues, handleChange, handleReset } = useForms({});
	const { organizationConfig } = useRealmConfig(realm);
	const {
		organization,
		execute: createOrganization,
		loading,
		error,
	} = usePostOrganization();

	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation();

	useEffect(() => {
		if (error) {
			enqueueSnackbar(t('create_organization.error') + error, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, error, t]);

	const handleSubmit = () => {
		createOrganization(formValues, realm, userStorage);
	};

	useEffect(() => {
		organization &&
			push(
				'/realm/' +
					realm +
					'/us/' +
					userStorage +
					'/organizations/' +
					(organization as Organization).identifiant,
			);
	}, [organization]);

	return (
		<Grid container spacing={2} direction="column">
			<Grid item xs={12}>
				<Title title={t('create_organization.title') + realm} />
			</Grid>
			<Grid item xs={12}>
				<DataViewer
					data={formValues}
					fieldToDisplay={organizationConfig}
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={3}
				>
					<Grid item>
						<LoadingButton
							handleClick={handleSubmit}
							loading={loading}
							color="primary"
							variant="contained"
						>
							{t(
								'create_organization.buttons.save',
							)}
						</LoadingButton>
					</Grid>

					<Grid item>
						<Button
							variant="contained"
							color="default"
							onClick={handleReset}
						>
							{t(
								'create_organization.buttons.reset',
							)}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CreateOrganization;
