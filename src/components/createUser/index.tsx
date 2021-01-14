import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import usePostUser from '../../hooks/user/usePostUser';
import DataViewer from '../commons/dataViewer/dataviewer';
import Title from '../commons/title/title';

const CreateUsers = () => {
	const { realm } = useParams<any>();
	const { push } = useHistory();
	const { formValues, handleChange, handleReset } = useForms({});
	const { userConfig } = useRealmConfig(realm);
	const { execute: createUser } = usePostUser();

	const handleSubmit = () => {
		createUser(realm, formValues);
		push('/realm/' + realm);
	};

	return (
		<Grid container spacing={2} direction="column">
			<Grid item xs={12}>
				<Title
					title={
						'Créer un utilisateur dans le realm: ' +
						realm
					}
				/>
			</Grid>
			<Grid item xs={12}>
				<DataViewer
					data={formValues}
					fieldToDisplay={userConfig}
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
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Enregistrer les modifications
						</Button>
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

export default CreateUsers;
