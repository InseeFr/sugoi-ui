import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import ConfirmationPopup from 'src/components/shared/confirmationPopUp';
import DataViewer from 'src/components/shared/dataViewer/dataviewer';
import ErrorBoundary from 'src/components/shared/error/Error';
import { Loader } from 'src/components/shared/loader/loader';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';
import useRealmConfig from 'src/lib/hooks/realm/useRealmConfig';
import { useForms } from 'src/lib/hooks/technics/useForms';
import { useDeleteUser } from 'src/lib/hooks/user/useDeleteUser';
import useGetUser from 'src/lib/hooks/user/useGetUser';
import useUpdateUser from 'src/lib/hooks/user/useUpdateUser';

const DetailUser = () => {
	const { realm, id, userStorage } = useParams<any>();

	const { push } = useHistory();

	const { userConfig } = useRealmConfig(realm);

	const { loading, user, execute } = useGetUser(id, realm, userStorage);

	const { execute: executeUpdate, loading: loadingUpdate } =
		useUpdateUser();

	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteUser();

	const { t } = useTranslation();
	document.title =
		t('detail_user.page_title_1') + id + t('detail_user.page_title_2');

	const { formValues, handleChange, handleReset, errors, handleSubmit } =
		useForms(user);

	const handleDelete = () =>
		executeDelete(user?.username as string, realm, userStorage).then(
			() =>
				push(
					'/realm/' +
						realm +
						(userStorage
							? '/us/' + userStorage + '/users'
							: '/users'),
				),
		);

	const onSubmit = () => {
		console.log(formValues);
		executeUpdate(id, formValues, realm, userStorage).then(() =>
			execute(id, realm, userStorage),
		);
	};

	const handleUpdate = () => {
		handleSubmit(userConfig)(onSubmit);
	};

	return (
		<>
			<Title title={t('detail_user.title') + id} />
			{loading ? (
				<Loader />
			) : (
				<ErrorBoundary>
					{formValues ? (
						<>
							<DataViewer
								data={formValues}
								fieldToDisplay={userConfig}
								handleChange={handleChange}
								errors={errors}
								buttons={
									<Grid
										container
										direction="row"
										justifyContent="center"
										spacing={3}
									>
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
											<ConfirmationPopup
												Icon={
													<LoadingButton
														variant="contained"
														color="secondary"
														loading={
															loadingDelete
														}
													>
														{t(
															'detail_user.buttons.delete.button',
														)}
													</LoadingButton>
												}
												title={
													t(
														'detail_user.buttons.delete.popup.title.part1',
													) +
													id +
													t(
														'detail_user.buttons.delete.popup.title.part2',
													)
												}
												body1={t(
													'detail_user.buttons.delete.popup.body.body1',
												)}
												body2={t(
													'detail_user.buttons.delete.popup.body.body2',
												)}
												bodyBold={t(
													'detail_user.buttons.delete.popup.body.bodyBold',
												)}
												validation_text={
													id
												}
												handleDelete={() =>
													handleDelete()
												}
											/>
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
								isUser={true}
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
