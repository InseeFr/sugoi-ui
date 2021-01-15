import { Button, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForms } from '../../hooks/technics/useForms';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';
import useGetUser from '../../hooks/user/useGetUser';
import useUpdateUser from '../../hooks/user/useUpdateUser';
import User from '../../model/api/user';
import DataViewer from '../commons/dataViewer/dataviewer';
import FieldsToDisplay from '../../hooks/realm/useRealmConfig/fieldToDisplay/FieldToDisplayConfigUser';
import { Loader } from '../commons/loader/loader';
import { ResetPasswordPopup } from '../commons/resetPasswordPopup/resetPasswordPopup';
import { SendPopupButton } from '../commons/sendPasswordPopup/sendPopup';
import Title from '../commons/title/title';
import LoadingButton from '../commons/loadingButton';
import { useSnackbar } from 'notistack';

const DetailUser = () => {
	const { realm, id } = useParams<any>();
	const { loading, user } = useGetUser(id, realm);
	const {
		execute: executeUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = useUpdateUser();
	const {
		execute: executeDelete,
		loading: loadingDelete,
		error: errorDelete,
	} = useDeleteUser();

	const { enqueueSnackbar } = useSnackbar();

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

	const {
		formValues,
		updateIFormValues,
		handleChange,
		handleReset,
	} = useForms({});

	useEffect(() => {
		if (user) {
			updateIFormValues(user);
		}
	}, [user, updateIFormValues]);
	return (
		<>
			<Title title={'Détail du contact ' + id} />
			{loading ? (
				<Loader />
			) : (
				<>
					<DataViewer
						data={formValues}
						fieldToDisplay={FieldsToDisplay}
						handleChange={handleChange}
					/>
					<Grid
						container
						direction="row"
						justify="center"
						spacing={3}
					>
						<Grid item>
							<SendPopupButton
								user={user as User}
							/>
						</Grid>

						<Grid item>
							<ResetPasswordPopup
								user={user as User}
							/>
						</Grid>
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
										(user as User)
											.username ||
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
								onClick={handleReset}
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

export default DetailUser;
