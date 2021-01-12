import React, { useEffect, useReducer } from 'react';
import Title from '../commons/title/title';
import DataViewer from '../commons/dataViewer/dataviewer';
import { Button, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import organization from '../../model/api/organization';
import useGetOrganization from '../../hooks/organization/useGetOrganization';
import useUpdateOrganization from '../../hooks/organization/useUpdateOrganization';
import { useDeleteOrganization } from '../../hooks/organization/useDeleteOrganization';
import { Loader } from '../commons/loader/loader';
import { useForms } from '../../hooks/technics/useForms';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';

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
	const { execute: executeUpdate } = useUpdateOrganization();
	const { execute: executeDelete } = useDeleteOrganization();
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
							<Button
								variant="contained"
								color="primary"
								onClick={() =>
									executeUpdate(
										realm,
										formValues,
									)
								}
							>
								Enregistrer les modifications
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={() =>
									executeDelete(
										realm,
										((organization as unknown) as organization)
											?.identifiant ||
											'',
									)
								}
							>
								Supprimer
							</Button>
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
