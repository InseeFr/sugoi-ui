import { useReactOidc } from '@axa-fr/react-oidc-context';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
	createStyles,
	makeStyles,
	MuiThemeProvider,
	Theme,
} from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../configuration/store-configuration';
import { DarkTheme, LightTheme } from './../material-ui-theme';
import BreadCrumbs from './commons/breadcrumbs/breadcrumbs';
import Header from './commons/header/header';
import ScrollTop from './commons/scroll-top/scroll-top';
import Sider from './commons/sider';
import ErrorBoundary from './commons/error/Error';
import Routes from './routes/routes';

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
			minHeight: '90%',
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
						<BreadCrumbs />
						<ErrorBoundary>
							<Routes />
						</ErrorBoundary>
					</Container>
					<ScrollTop />
				</main>
			</div>
		</MuiThemeProvider>
	);
};

export default App;
