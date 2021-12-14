import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import DataViewer from 'src/components/shared/dataViewer/dataviewer';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';
import { useForms } from 'src/lib/hooks/technics/useForms';
import { usePostUser, useRealmConfig } from 'src/lib/hooks/api-hooks';

const CreateUsers = () => {
	const { realm, userStorage } = useParams<any>();
	const { push } = useHistory();
	const { formValues, handleChange, handleReset } = useForms({});
	const { userConfig } = useRealmConfig(realm);
	const { user, execute: createUser, error, loading } = usePostUser();
	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const handleSubmit = () => {
		createUser(formValues, realm, userStorage);
	};

	useEffect(() => {
		user &&
			push(
				'/realm/' +
					realm +
					'/us/' +
					userStorage +
					'/users/' +
					user.username,
			);
	}, [push, realm, user, userStorage]);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(t('create_user.error') /*+ error*/, {
				variant: 'error',
			});
		}
	}, [enqueueSnackbar, error, t]);

	return (
		<Grid container spacing={2} direction="column">
			<Grid item xs={12}>
				<Title title={t('create_user.title') + realm} />
			</Grid>
			<Grid item xs={12}>
				<DataViewer
					data={formValues}
					fieldToDisplay={userConfig}
					handleChange={handleChange}
					buttons={
						<Grid item xs={12}>
							<Grid
								container
								direction="row"
								justifyContent="center"
								spacing={3}
							>
								<Grid item>
									<LoadingButton
										handleClick={
											handleSubmit
										}
										loading={loading}
										color="primary"
										variant="contained"
									>
										{t(
											'create_user.buttons.save',
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
											'create_user.buttons.reset',
										)}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					}
					create={true}
					isUser={true}
				/>
			</Grid>
		</Grid>
	);
};

export default CreateUsers;
