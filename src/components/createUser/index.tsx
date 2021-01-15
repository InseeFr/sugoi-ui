import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import usePostUser from '../../hooks/user/usePostUser';
import DataViewer from '../commons/dataViewer/dataviewer';
import LoadingButton from '../commons/loadingButton';
import Title from '../commons/title/title';

const CreateUsers = () => {
	const { realm } = useParams<any>();
	const { push } = useHistory();
	const { formValues, handleChange, handleReset } = useForms({});
	const { userConfig } = useRealmConfig(realm);
	const { user, execute: createUser, error, loading } = usePostUser();
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = () => {
		createUser(realm, formValues);
	};

	useEffect(() => {
		if (error) {
			enqueueSnackbar("Erreur lors de l'envoi à l'api: " + error, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, error]);

	useEffect(() => {
		if (user) {
			push('/realm/' + realm + '/user/' + user.username);
		}
	}, [user, realm, push]);

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

export default CreateUsers;
