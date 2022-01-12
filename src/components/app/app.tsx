import { useReactOidc, withOidcSecure } from '@axa-fr/react-oidc-context';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
	createStyles,
	makeStyles,
	MuiThemeProvider,
	Theme,
} from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
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
										key={'route_' + i}
										exact={route.exact}
										path={route.path}
										component={
											route.secure
												? withOidcSecure(
														route.component,
												  )
												: route.component
										}
									/>
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
