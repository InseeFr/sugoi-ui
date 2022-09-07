import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	TextField,
	Box,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import {
	useCreateApplication,
	useGetApplications,
	useWhoAmI,
} from 'src/lib/hooks/api-hooks';
import { ButtonDescription } from 'src/components/shared/description';
import Title from 'src/components/shared/title/title';
import CreateApplicationButton from './button-create-app';
import Application from 'src/lib/model/api/application';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApplicationsFavoriteList from './applications_favorite_list';
import ApplicationsViewer from './applications_viewer';

export const SearchApplications = () => {
	const { t } = useTranslation();
	const { realm } = useParams<any>();
	const { applications, execute, loading } = useGetApplications(
		realm,
		undefined,
		true,
	);
	const {
		applications: applicationsForFavorite,
		loading: loadingFavorite,
	} = useGetApplications(realm, undefined, false);

	const { execute: createApplication } = useCreateApplication();
	const [search, setSearch] = useState<string>('');
	const { push } = useHistory();

	document.title = t('search_application.page_title');

	const handleCreateApp = (appName: string, owner: string) => {
		createApplication(realm, {
			name: appName,
			owner: owner,
			groups: [],
		}).then(() => execute(realm));
	};

	const handleClickOnApp = (application: Application) => {
		console.log(application);
		push('/realm/' + realm + '/' + 'applications/' + application.name);
	};

	const handleClickOnRow = (appname: string) => {
		push('/realm/' + realm + '/' + 'applications/' + appname);
	};

	const handleSearch = (e: any) => {
		setSearch(e.target.value);
		execute(realm, e.target.value === '' ? undefined : e.target.value);
	};

	const { rights, loading: loadingWhoAmI } = useWhoAmI();

	console.log(applications);

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="stretch"
			spacing={3}
		>
			<Grid
				item
				xs={12}
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<Title title={t('search_application.title') + realm} />
				<ButtonDescription realmName={realm} />
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justifyContent="flex-end"
					alignItems="center"
				>
					<CreateApplicationButton
						handleCreateApp={handleCreateApp}
					/>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Accordion defaultExpanded={true}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Title
							variant="subtitle1"
							title={t(
								'search_application.my_apps',
							)}
						/>
					</AccordionSummary>
					<AccordionDetails>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="stretch"
							spacing={3}
						>
							<Grid item xs={12}>
								<ApplicationsFavoriteList
									applications={applicationsForFavorite.filter(
										(application) =>
											rights?.appManager.includes(
												application.name.toUpperCase(),
											),
									)}
									handleClickOnApp={
										handleClickOnApp
									}
									loading={
										loadingFavorite ||
										loadingWhoAmI
									}
								/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
			</Grid>
			<Grid item xs={12}>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Title
							variant="subtitle1"
							title={t(
								'search_application.all_apps',
							)}
						/>
					</AccordionSummary>
					<AccordionDetails>
						<Box style={{ width: '100%' }}>
							<Grid
								container
								direction="column"
								justifyContent="center"
								alignItems="stretch"
								spacing={3}
							>
								<Grid item xs={12}>
									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										alignItems="stretch"
										spacing={3}
									>
										<Grid item xs={12}>
											<TextField
												id="application-search-textfield"
												label={t(
													'search_application.search_field',
												)}
												variant="filled"
												onChange={
													handleSearch
												}
												value={
													search
												}
												fullWidth
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<ApplicationsViewer
										applications={
											applications
										}
										loading={loading}
										handleClickOnApp={
											handleClickOnRow
										}
									/>
								</Grid>
							</Grid>
						</Box>
					</AccordionDetails>
				</Accordion>
			</Grid>
		</Grid>
	);
};
