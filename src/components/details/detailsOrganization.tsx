import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteOrganization } from '../../hooks/organization/useDeleteOrganization';
import useGetOrganization from '../../hooks/organization/useGetOrganization';
import useUpdateOrganization from '../../hooks/organization/useUpdateOrganization';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import organization from '../../model/api/organization';
import DataViewer from '../commons/dataViewer/dataviewer';
import { Loader } from '../commons/loader/loader';
import LoadingButton from '../commons/loadingButton';
import Title from '../commons/title/title';

interface props {
	data: organization;
	fieldToDisplay: any;
	id: string;
	dispatch: React.Dispatch<any>;
}

const DetailOrganization = () => {
	const { realm, id } = useParams<any>();
	const { organizationConfig } = useRealmConfig(realm);
	const { loading, organization } = useGetOrganization(id, realm);
	const {
		execute: executeUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = useUpdateOrganization();
	const {
		execute: executeDelete,
		loading: loadingDelete,
		error: errorDelete,
	} = useDeleteOrganization();
	const { enqueueSnackbar } = useSnackbar();
	const {
		formValues,
		updateIFormValues,
		handleChange,
		handleReset,
	} = useForms({});

	useEffect(() => {
		if (organization) {
			updateIFormValues(organization);
		}
	}, [organization, updateIFormValues]);

	useEffect(() => {
		if (errorDelete) {
			enqueueSnackbar(
				"Erreur lors de l'envoi à l'api: " + errorDelete,
				{
					variant: 'error',
				},
			);
		}
	}, [enqueueSnackbar, errorDelete]);

	useEffect(() => {
		if (errorUpdate) {
			enqueueSnackbar(
				"Erreur lors de l'envoi à l'api: " + errorUpdate,
				{
					variant: 'error',
				},
			);
		}
	}, [enqueueSnackbar, errorUpdate]);

	return (
		<>
			<Title title={"Détail de l'organisation " + id} />
			{loading ? (
				<Loader />
			) : (
				<>
					<DataViewer
						data={formValues}
						fieldToDisplay={organizationConfig}
						handleChange={handleChange}
					/>
					<Grid
						container
						direction="row"
						justify="center"
						spacing={3}
					>
						<Grid item>
							<LoadingButton
								variant="contained"
								color="primary"
								loading={loadingUpdate}
								handleClick={() =>
									executeUpdate(
										realm,
										id,
										formValues,
									)
								}
							>
								Enregistrer les modifications
							</LoadingButton>
						</Grid>
						<Grid item>
							<LoadingButton
								variant="contained"
								color="secondary"
								loading={loadingDelete}
								handleClick={() =>
									executeDelete(
										realm,
										((organization as unknown) as organization)
											?.identifiant ||
											'',
									)
								}
							>
								Supprimer
							</LoadingButton>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="default"
								onClick={() => handleReset()}
							>
								Restaurer formulaire
							</Button>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default DetailOrganization;
