import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from 'src/components/shared/confirmationPopUp';
import DataViewer from 'src/components/shared/dataViewer/dataviewer';
import ErrorBoundary from 'src/components/shared/error/Error';
import LoadingButton from 'src/components/shared/loadingButton';
import { useForms } from 'src/lib/hooks/technics/useForms';
import Organization from 'src/lib/model/api/organization';
import User from 'src/lib/model/api/user';
import { Field } from 'src/lib/model/field';

type Entity = User | Organization;

const DetailEntityContent = ({
	entity,
	entityId,
	isUser,
	realm,
	userStorage,
	executeUpdate,
	loadingUpdate,
	executeDelete,
	loadingDelete,
	executeGet,
	fieldsConfig,
	deleteRedirectPath,
	rootTranslation,
}: {
	entity: Entity;
	entityId: string;
	isUser: boolean;
	realm: string;
	userStorage?: string;
	executeUpdate: (
		id: string,
		entity: Entity,
		realm: string,
		userStorage?: string,
	) => Promise<void>;
	loadingUpdate: boolean;
	executeDelete: (
		id: string,
		realm: string,
		userStorage?: string,
	) => Promise<void>;
	loadingDelete: boolean;
	executeGet: (
		id: string,
		realm: string,
		userStorage?: string,
	) => Promise<void>;
	fieldsConfig: Field[];
	deleteRedirectPath: string;
	rootTranslation: string;
}) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { formValues, handleChange, handleReset, errors, handleSubmit } =
		useForms(entity);

	const handleDelete = async () => {
		await executeDelete(entityId, realm, userStorage);
		navigate(deleteRedirectPath);
	};

	const handleUpdate = () =>
		executeUpdate(entityId, formValues, realm, userStorage).then(() =>
			executeGet(entityId, realm, userStorage),
		);

	const submit = () => {
		handleSubmit(fieldsConfig)(handleUpdate);
	};

	return (
		<ErrorBoundary>
			<DataViewer
				data={formValues}
				fieldToDisplay={fieldsConfig}
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
								loading={loadingUpdate}
								handleClick={submit}
							>
								{t(
									rootTranslation +
										'.buttons.save',
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
											rootTranslation +
												'.buttons.delete.button',
										)}
									</LoadingButton>
								}
								title={
									t(
										rootTranslation +
											'.buttons.delete.popup.title.part1',
									) +
									entityId +
									t(
										rootTranslation +
											'.buttons.delete.popup.title.part2',
									)
								}
								body1={t(
									rootTranslation +
										'.buttons.delete.popup.body.body1',
								)}
								body2={t(
									rootTranslation +
										'.buttons.delete.popup.body.body2',
								)}
								bodyBold={t(
									rootTranslation +
										'.buttons.delete.popup.body.bodyBold',
								)}
								validation_text={entityId ?? ''}
								handleDelete={() =>
									handleDelete()
								}
							/>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								onClick={handleReset}
							>
								{t(
									rootTranslation +
										'.buttons.reset',
								)}
							</Button>
						</Grid>
					</Grid>
				}
				create={false}
				isUser={isUser}
			/>
		</ErrorBoundary>
	);
};

export default DetailEntityContent;
