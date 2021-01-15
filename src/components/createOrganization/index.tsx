import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import usePostOrganization from '../../hooks/organization/usePostOrganization';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import DataViewer from '../commons/dataViewer/dataviewer';
import LoadingButton from '../commons/loadingButton';
import Title from '../commons/title/title';

const CreateOrganization = () => {
	const { realm } = useParams<any>();
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

	useEffect(() => {
		if (error) {
			enqueueSnackbar("Erreur lors de l'envoi à l'api: " + error, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, error]);

	const handleSubmit = () => {
		createOrganization(realm, formValues);
	};

	useEffect(() => {
		if (organization) {
			push(
				'/realm/' +
					realm +
					'/organization/' +
					organization.identifiant,
			);
		}
	}, [organization, realm, push]);

	return (
		<Grid container spacing={2} direction="column">
			<Grid item xs={12}>
				<Title
					title={
						'Créer une organisation dans le realm: ' +
						realm
					}
				/>
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
							Enregistrer les modifications
						</LoadingButton>
					</Grid>

					<Grid item>
						<Button
							variant="contained"
							color="default"
							onClick={handleReset}
						>
							Restaurer formulaire
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CreateOrganization;
