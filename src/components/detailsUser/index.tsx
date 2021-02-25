import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import FieldsToDisplay from '../../hooks/realm/useRealmConfig/fieldToDisplay/FieldToDisplayConfigUser';
import { useForms } from '../../hooks/technics/useForms';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';
import useGetUser from '../../hooks/user/useGetUser';
import useUpdateUser from '../../hooks/user/useUpdateUser';
import User from '../../model/api/user';
import DataViewer from '../commons/dataViewer/dataviewer';
import ErrorBoundary from '../commons/error/Error';
import { Loader } from '../commons/loader/loader';
import LoadingButton from '../commons/loadingButton';
import ResetPasswordPopup from '../commons/resetPasswordPopup';
import SendUsernamePopup from '../commons/sendUsernamePopup';
import Title from '../commons/title/title';

const DetailUser = () => {
	const { realm, id, userStorage } = useParams<any>();

	const { push } = useHistory();

	const { loading, user } = useGetUser(id, realm, userStorage);

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

	const { t } = useTranslation();

	useEffect(() => {
		if (errorDelete) {
			enqueueSnackbar(t('details_user.error') + errorDelete, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, errorDelete, t]);

	useEffect(() => {
		if (errorUpdate) {
			enqueueSnackbar(t('details_user.error') + errorUpdate, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, errorUpdate, t]);

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
			<Title title={t('detail_user.title') + id} />
			{loading || user === undefined ? (
				<Loader />
			) : (
				<ErrorBoundary>
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
							<SendUsernamePopup
								user={user as User}
							/>
						</Grid>

						<Grid item>
							<ResetPasswordPopup
								user={user as User}
								realm={realm}
							/>
						</Grid>
						<Grid item>
							<LoadingButton
								variant="contained"
								color="primary"
								loading={loadingUpdate}
								handleClick={() =>
									executeUpdate(
										id,
										formValues,
										realm,
									)
								}
							>
								{t('detail_user.buttons.save')}
							</LoadingButton>
						</Grid>
						<Grid item>
							<LoadingButton
								variant="contained"
								color="secondary"
								loading={loadingDelete}
								handleClick={() => {
									executeDelete(
										user?.username as string,
										realm,
										userStorage,
									).then(() =>
										push(
											'/realm/' +
												realm +
												(userStorage
													? '/us/' +
													  userStorage +
													  '/users'
													: '/users'),
										),
									);
								}}
							>
								{t(
									'detail_user.buttons.delete',
								)}
							</LoadingButton>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="default"
								onClick={handleReset}
							>
								{t('detail_user.buttons.reset')}
							</Button>
						</Grid>
					</Grid>
				</ErrorBoundary>
			)}
		</>
	);
};

export default DetailUser;
