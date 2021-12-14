import { Button, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import {
	useDeleteOrganization,
	useRealmConfig,
	useUpdateOrganization,
	useGetOrganization,
} from 'src/lib/hooks/api-hooks';
import { useForms } from 'src/lib/hooks/technics/useForms';
import organization from 'src/lib/model/api/organization';
import ConfirmationPopup from 'src/components/shared/confirmationPopUp';
import DataViewer from 'src/components/shared/dataViewer/dataviewer';
import ErrorBoundary from 'src/components/shared/error/Error';
import { Loader } from 'src/components/shared/loader/loader';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';

interface props {
	data: organization;
	fieldToDisplay: any;
	id: string;
	dispatch: React.Dispatch<any>;
}

const DetailOrganization = () => {
	const { realm, id, userStorage } = useParams<any>();
	const { push } = useHistory();
	const { organizationConfig } = useRealmConfig(realm);
	const {
		loading,
		organization,
		execute,
		error: errorGet,
	} = useGetOrganization(id, realm, userStorage);

	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const {
		execute: executeUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = useUpdateOrganization();

	const {
		execute: executeDelete,
		loading: loadingDelete,
		error: errorDelete,
	} = useDeleteOrganization();

	const { formValues, updateIFormValues, handleChange, handleReset } =
		useForms({});

	useEffect(() => {
		if (organization) {
			updateIFormValues(organization);
		}
	}, [organization, updateIFormValues]);

	useEffect(() => {
		if (errorDelete) {
			enqueueSnackbar(
				t('detail_organization.error') + errorDelete,
				{
					variant: 'error',
				},
			);
		}
	}, [enqueueSnackbar, errorDelete, t]);

	useEffect(() => {
		if (errorUpdate) {
			enqueueSnackbar(
				t('detail_organization.error') + errorUpdate,
				{
					variant: 'error',
				},
			);
		}
	}, [enqueueSnackbar, errorUpdate, t]);

	useEffect(() => {
		if (errorGet) {
			enqueueSnackbar(t('detail_organization.error') + errorGet, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, errorGet, t]);

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

	const handleUpdate = () => {
		executeUpdate(id, formValues, realm, userStorage).then(() =>
			execute(id, realm, userStorage),
		);
	};

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
