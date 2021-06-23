import { Button, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useDeleteOrganization } from '../../hooks/api/organization/useDeleteOrganization';
import useGetOrganization from '../../hooks/api/organization/useGetOrganization';
import useUpdateOrganization from '../../hooks/api/organization/useUpdateOrganization';
import useRealmConfig from '../../hooks/api/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import organization from '../../model/api/organization';
import DataViewer from '../commons/dataViewer/dataviewer';
import ErrorBoundary from '../commons/error/Error';
import { Loader } from '../commons/loader/loader';
import LoadingButton from '../commons/loadingButton';
import Title from '../commons/title/title';

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

	const {
		formValues,
		updateIFormValues,
		handleChange,
		handleReset,
	} = useForms({});

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

	const handleDelete = () => {
		executeDelete(
			((organization as unknown) as organization)?.identifiant ||
				'',
			realm,
			userStorage,
		).then(() =>
			push(
				'/realm/' +
					realm +
					(userStorage
						? '/us/' + userStorage + '/organizations'
						: '/organizations'),
			),
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
										justify="center"
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
													'detail_organization.buttons.delete',
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
