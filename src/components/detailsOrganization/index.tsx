import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDeleteOrganization } from '../../hooks/organization/useDeleteOrganization';
import useGetOrganization from '../../hooks/organization/useGetOrganization';
import useUpdateOrganization from '../../hooks/organization/useUpdateOrganization';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import organization from '../../model/api/organization';
import DataViewer from '../commons/dataViewer/dataviewer';
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
	const { realm, id } = useParams<any>();
	const { organizationConfig } = useRealmConfig(realm);
	const { loading, organization } = useGetOrganization(id, realm);
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
	const { enqueueSnackbar } = useSnackbar();
	const {
		formValues,
		updateIFormValues,
		handleChange,
		handleReset,
	} = useForms({});
	const { t } = useTranslation();

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

	return (
		<>
			<Title title={t('detail_organization.title') + id} />
			{loading ? (
				<Loader />
			) : (
				<>
					<DataViewer
						data={formValues}
						fieldToDisplay={organizationConfig}
						handleChange={handleChange}
					/>
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
								loading={loadingUpdate}
								handleClick={() =>
									executeUpdate(
										realm,
										id,
										formValues,
									)
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
								loading={loadingDelete}
								handleClick={() =>
									executeDelete(
										realm,
										((organization as unknown) as organization)
											?.identifiant ||
											'',
									)
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
								onClick={() => handleReset()}
							>
								{t(
									'detail_organization.buttons.reset',
								)}
							</Button>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default DetailOrganization;
