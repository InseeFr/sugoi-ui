import React, { useEffect, useReducer } from 'react';
import Title from '../commons/title/title';
import DataViewer from '../commons/dataViewer/dataviewer';
import { Button, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import reducer from '../commons/dataViewer/dataviewer.reducer';
import FieldsToDisplay from '../commons/dataViewer/fieldToDisplay/FieldToDisplayConfig';
import organization from '../../model/organization';
import useGetOrganization from '../../hooks/organization/useGetOrganization';
import useUpdateOrganization from '../../hooks/organization/useUpdateOrganization';
import { useDeleteOrganization } from '../../hooks/organization/useDeleteOrganization';
import { Loader } from '../commons/loader/loader';

interface props {
	data: organization;
	fieldToDisplay: any;
	id: string;
	dispatch: React.Dispatch<any>;
}

const DetailOrganization = () => {
	const { realm, id } = useParams<any>();
	const [state, dispatch] = useReducer(reducer, {
		data: {},
		initialData: {},
	});
	const { loading, organization } = useGetOrganization(id, realm);
	const { execute: executeUpdate } = useUpdateOrganization();
	const { execute: executeDelete } = useDeleteOrganization();

	useEffect(() => {
		if (organization) {
			dispatch({ type: 'UpdateData', payload: organization });
		}
	}, [organization]);

	return loading ? (
		<Loader />
	) : (
		<>
			<Title title={"Détail de l'organisation " + id} />
			<DataViewer
				data={state.data || organization}
				fieldToDisplay={FieldsToDisplay}
				dispatch={dispatch}
				type="organization"
			/>
			<Grid item xs={12}>
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
									organization as organization,
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
									(organization as organization)
										.identifiant,
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
							onClick={() =>
								dispatch({
									type: 'Reset',
								})
							}
						>
							Restaurer formulaire
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default DetailOrganization;
