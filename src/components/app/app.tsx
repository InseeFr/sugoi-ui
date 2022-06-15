import { OidcSecure, useReactOidc } from '@axa-fr/react-oidc-context';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
	createStyles,
	makeStyles,
	MuiThemeProvider,
	Theme,
} from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	matchPath,
	Redirect,
	Route,
	Switch,
	useLocation,
	useHistory,
} from 'react-router-dom';
import { RootState } from 'src/lib/configuration/store-configuration';
import { DarkTheme, LightTheme } from 'src/components/material-ui-theme';
import routes from 'src/components/routes/routes';
import BreadCrumbs from 'src/components/shared/breadcrumbs/breadcrumbs';
import ErrorBoundary from 'src/components/shared/error/Error';
import Footer from 'src/components/shared/footer/footer';
import Header from 'src/components/shared/header/header';
import Notifier from 'src/components/shared/notifications';
import ScrollTop from 'src/components/shared/scroll-top/scroll-top';
import Sider from 'src/components/shared/sider';
import { useTranslation } from 'react-i18next';
import { changeCurrentRealm } from 'src/lib/redux/actions/app';
import useGetCurrentRealm from 'src/lib/hooks/realm/useGetCurrentRealm';

const matchRealmAndUS = (location: string) => {
	let matchRealmUs = matchPath<{ realm: 'string'; userStorage: 'string' }>(
		location,
		{
			path: `/realm/:realm/us/:userStorage`,
			exact: false,
			strict: false,
		},
	);
	if (!matchRealmUs) {
		matchRealmUs = matchPath<{
			realm: 'string';
			userStorage: 'string';
		}>(location, {
			path: `/realm/:realm`,
			exact: false,
			strict: false,
		});
	}
	return matchRealmUs?.params;
};

const RouteOrRedirect = ({
	component,
	isSecure,
}: {
	component: () => JSX.Element;
	isSecure: boolean;
}): JSX.Element => {
	const location = useLocation();
	const realmUsState = useGetCurrentRealm();
	const dispatch = useDispatch();
	const { push } = useHistory();
	const [isInitialized, setInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (location && realmUsState) {
			const match = matchRealmAndUS(location.pathname);
			const currentRealmName = match?.realm;
			const currentUserstorageName = match?.userStorage;
			if (
				currentRealmName !== realmUsState.currentRealm?.name ||
				currentUserstorageName !== realmUsState.currentUs?.name
			) {
				if (isInitialized) {
					push(realmUsState.realmUsPath);
				} else {
					dispatch(
						changeCurrentRealm(
							currentRealmName,
							currentUserstorageName,
						),
					);
				}
			}
			setInitialized(true);
		}
	}, [location, realmUsState, isInitialized, push, dispatch]);

	return isSecure ? <OidcSecure>{component()}</OidcSecure> : component();
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},

		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},

		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(1),
		},
	}),
);

const App = () => {
	const classes = useStyles();
	const { oidcUser } = useReactOidc();
	const appStore = useSelector((store: RootState) => store.app);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};
	const { i18n } = useTranslation();

	useEffect(() => {
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<MuiThemeProvider
			theme={appStore.theme === 'dark' ? DarkTheme : LightTheme}
		>
			<div className={classes.root}>
				<CssBaseline />
				<Header handleDrawerToggle={handleDrawerToggle} />
				{oidcUser ? (
					<Sider
						drawerOpen={drawerOpen}
						handleDrawerToggle={handleDrawerToggle}
					/>
				) : null}
				<main className={classes.content}>
					<div id="back-to-top-anchor" />
					<div className={classes.toolbar} />
					<Container
						maxWidth="xl"
						className={classes.container}
					>
						<Notifier />
						<BreadCrumbs />
						<ErrorBoundary>
							<Switch>
								{routes.map((route, i) => (
									<Route
										exact={route.exact}
										path={route.path}
										key={i}
									>
										<RouteOrRedirect
											component={
												route.component
											}
											isSecure={
												route.secure
											}
										/>
									</Route>
								))}
								<Redirect to="/" />
							</Switch>
						</ErrorBoundary>
					</Container>
					<ScrollTop />
					<Footer />
				</main>
			</div>
		</MuiThemeProvider>
	);
};

export default App;
