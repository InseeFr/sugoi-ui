import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import DataViewer from 'src/components/shared/dataViewer/dataviewer';
import LoadingButton from 'src/components/shared/loadingButton';
import Title from 'src/components/shared/title/title';
import { usePostUser, useRealmConfig } from 'src/lib/hooks/api-hooks';
import { useForms } from 'src/lib/hooks/technics/useForms';
import User from 'src/lib/model/api/user';

const CreateUsers = () => {
	const { realm, userStorage } = useParams<any>();

	const { push } = useHistory();
	const { formValues, handleChange, handleReset, errors, handleSubmit } =
		useForms({});
	const { userConfig } = useRealmConfig(realm);
	const { execute: createUser, loading } = usePostUser();
	const { t } = useTranslation();
	document.title = t('create_user.page_title');

	const onSubmit = () =>
		createUser(formValues, realm, userStorage).then(
			(user: User | undefined) =>
				user &&
				push(
					'/realm/' +
						realm +
						'/us/' +
						userStorage +
						'/users/' +
						user?.username,
				),
		);

	const handleCreate = () => {
		handleSubmit(userConfig)(onSubmit);
	};

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
					errors={errors}
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
											handleCreate
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
