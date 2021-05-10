import { withOidcSecure } from '@axa-fr/react-oidc-context';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
	createStyles,
	makeStyles,
	MuiThemeProvider,
	Theme,
} from '@material-ui/core/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import useAuth from '../hooks/auth/useAuth';
import { RootState } from './../configuration/store-configuration';
import { DarkTheme, LightTheme } from './../material-ui-theme';
import routes from './../routes/routes';
import BreadCrumbs from './commons/breadcrumbs/breadcrumbs';
import ErrorBoundary from './commons/error/Error';
import Footer from './commons/footer/footer';
import Header from './commons/header/header';
import ScrollTop from './commons/scroll-top/scroll-top';
import Sider from './commons/sider';

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
	const { authenticated } = useAuth();
	const appStore = useSelector((store: RootState) => store.app);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<MuiThemeProvider
			theme={appStore.theme === 'dark' ? DarkTheme : LightTheme}
		>
			<div className={classes.root}>
				<CssBaseline />
				<Header handleDrawerToggle={handleDrawerToggle} />
				{authenticated && (
					<Sider
						drawerOpen={drawerOpen}
						handleDrawerToggle={handleDrawerToggle}
					/>
				)}
				<main className={classes.content}>
					<div id="back-to-top-anchor" />
					<div className={classes.toolbar} />
					<Container
						maxWidth="xl"
						className={classes.container}
					>
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
