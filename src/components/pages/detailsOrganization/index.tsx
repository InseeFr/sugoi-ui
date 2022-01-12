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
import {
	useDeleteOrganization,
	useGetOrganization,
	useRealmConfig,
	useUpdateOrganization,
} from 'src/lib/hooks/api-hooks';
import { useForms } from 'src/lib/hooks/technics/useForms';
import organization from 'src/lib/model/api/organization';

const DetailOrganization = () => {
	const { realm, id, userStorage } = useParams<any>();
	const { push } = useHistory();
	const { t } = useTranslation();
	const { organizationConfig } = useRealmConfig(realm);

	const { loading, organization, execute } = useGetOrganization(
		id,
		realm,
		userStorage,
	);

	const { formValues, handleChange, handleReset, errors, handleSubmit } =
		useForms(organization);

	const { execute: executeUpdate, loading: loadingUpdate } =
		useUpdateOrganization();

	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteOrganization();

	const handleDelete = async () => {
		await executeDelete(
			(organization as unknown as organization)?.identifiant || '',
			realm,
			userStorage,
		);
		push(
			'/realm/' +
				realm +
				(userStorage
					? '/us/' + userStorage + '/organizations'
					: '/organizations'),
		);
	};

	const onSubmit = () =>
		executeUpdate(id, formValues, realm, userStorage).then(() =>
			execute(id, realm, userStorage),
		);

	const handleUpdate = () => {
		handleSubmit(organizationConfig)(onSubmit);
	};

	document.title =
		t('detail_organization.page_title_1') +
		id +
		t('detail_organization.page_title_2');

	return (
		<>
			<Title title={t('detail_organization.title') + id} />
			{loading ? (
				<Loader />
			) : (
				<ErrorBoundary>
					{organization ? (
						<>
							<DataViewer
								data={formValues}
								fieldToDisplay={
									organizationConfig
								}
								errors={errors}
								handleChange={handleChange}
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
													'detail_organization.buttons.save',
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
															'detail_organization.buttons.delete.button',
														)}
													</LoadingButton>
												}
												title={
													t(
														'detail_organization.buttons.delete.popup.title.part1',
													) +
													id +
													t(
														'detail_organization.buttons.delete.popup.title.part2',
													)
												}
												body1={t(
													'detail_organization.buttons.delete.popup.body.body1',
												)}
												body2={t(
													'detail_organization.buttons.delete.popup.body.body2',
												)}
												bodyBold={t(
													'detail_organization.buttons.delete.popup.body.bodyBold',
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
													'detail_organization.buttons.reset',
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
							{t(
								'detail_organization.organization_not_found',
							)}
						</Typography>
					)}
				</ErrorBoundary>
			)}
		</>
	);
};

export default DetailOrganization;
