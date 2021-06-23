import { Button, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import useRealmConfig from '../../hooks/api/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import { useDeleteUser } from '../../hooks/api/user/useDeleteUser';
import useGetUser from '../../hooks/api/user/useGetUser';
import useUpdateUser from '../../hooks/api/user/useUpdateUser';
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

	const { userConfig } = useRealmConfig(realm);

	const { loading, user, error: errorGetUser, execute } = useGetUser(
		id,
		realm,
		userStorage,
	);

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

	const { t } = useTranslation();

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

	const handleDelete = () =>
		executeDelete(
			user?.username as string,
			realm,
			userStorage,
		).then(() =>
			push(
				'/realm/' +
					realm +
					(userStorage
						? '/us/' + userStorage + '/users'
						: '/users'),
			),
		);

	const handleUpdate = () =>
		executeUpdate(id, formValues, realm, userStorage).then(() =>
			execute(id, realm, userStorage),
		);

	return (
		<>
			<Title title={t('detail_user.title') + id} />
			{loading ? (
				<Loader />
			) : (
				<ErrorBoundary>
					{user ? (
						<>
							<DataViewer
								data={formValues}
								fieldToDisplay={userConfig}
								handleChange={handleChange}
								buttons={
									<Grid
										container
										direction="row"
										justify="center"
										spacing={3}
									>
										<Grid item>
											<SendUsernamePopup
												realm={
													realm
												}
												userStorage={
													userStorage
												}
												user={
													user as User
												}
											/>
										</Grid>

										<Grid item>
											<ResetPasswordPopup
												user={
													user as User
												}
												realm={
													realm
												}
												userStorage={
													userStorage
												}
											/>
										</Grid>
										<Grid item>
											<LoadingButton
												variant="contained"
												color="primary"
												loading={
													loadingUpdate
												}
												handleClick={
													handleUpdate
												}
											>
												{t(
													'detail_user.buttons.save',
												)}
											</LoadingButton>
										</Grid>
										<Grid item>
											<LoadingButton
												variant="contained"
												color="secondary"
												loading={
													loadingDelete
												}
												handleClick={
													handleDelete
												}
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
												onClick={
													handleReset
												}
											>
												{t(
													'detail_user.buttons.reset',
												)}
											</Button>
										</Grid>
									</Grid>
								}
								create={false}
							/>
						</>
					) : (
						<Typography variant="h6" gutterBottom>
							{t('detail_user.user_not_found')}
						</Typography>
					)}
				</ErrorBoundary>
			)}
		</>
	);
};

export default DetailUser;
