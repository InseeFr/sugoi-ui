import { Button, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForms } from '../../hooks/technics/useForms';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';
import useGetUser from '../../hooks/user/useGetUser';
import useUpdateUser from '../../hooks/user/useUpdateUser';
import User from '../../model/api/user';
import DataViewer from '../commons/dataViewer/dataviewer';
import FieldsToDisplay from '../formular/fieldToDisplay/FieldToDisplayConfig';
import { Loader } from '../commons/loader/loader';
import { ResetPasswordPopup } from '../commons/resetPasswordPopup/resetPasswordPopup';
import { SendPopupButton } from '../commons/sendPasswordPopup/sendPopup';
import Title from '../commons/title/title';

interface props {
	data: User;
	fieldToDisplay: any;
	id: string;
	dispatch: React.Dispatch<any>;
}

const DetailUser = () => {
	const { realm, id } = useParams<any>();
	const { loading, user } = useGetUser(id, realm);
	const { execute: executeUpdate } = useUpdateUser();
	const { execute: executeDelete } = useDeleteUser();
	const {
		formValues,
		iFormValues,
		updateIFormValues,
		handleChange,
		handleReset,
	} = useForms({});

	useEffect(() => {
		if (user) {
			updateIFormValues(user);
		}
	}, [user, updateIFormValues]);

	return loading ? (
		<Loader />
	) : (
		<>
			<Title title={'Détail du contact ' + id} />
			<DataViewer
				data={formValues}
				fieldToDisplay={FieldsToDisplay}
				handleChange={handleChange}
				type="user"
			/>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={3}
				>
					<Grid item>
						<SendPopupButton user={user as User} />
					</Grid>

					<Grid item>
						<ResetPasswordPopup user={user as User} />
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								executeUpdate(
									realm,
									user as User,
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
									(user as User).username ||
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
							onClick={handleReset}
						>
							Restaurer formulaire
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default DetailUser;
