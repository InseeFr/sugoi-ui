import { useOidcAccessToken, withOidcSecure } from '@axa-fr/react-oidc';
import { Box, Container, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
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

const ThemeWrapper = () => {
	const theme = useTheme();
	const accessToken = useOidcAccessToken().accessToken;
	const [drawerOpen, setDrawerOpen] = useState(false);
	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<CssBaseline />
			<Header handleDrawerToggle={handleDrawerToggle} />
			{accessToken !== null ? (
				<Sider
					drawerOpen={drawerOpen}
					handleDrawerToggle={handleDrawerToggle}
				/>
			) : null}
			<Box
				sx={{
					flexGrow: 1,
					padding: theme.spacing(3),
				}}
			>
				<Box id="back-to-top-anchor" />
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						padding: theme.spacing(0, 1),
						// necessary for content to be below app bar
						...theme.mixins.toolbar,
					}}
				/>
				<Container
					maxWidth="xl"
					sx={{
						paddingTop: theme.spacing(4),
						paddingBottom: theme.spacing(1),
					}}
				>
					<Notifier />
					<BreadCrumbs />
					<ErrorBoundary>
						<Routes>
							{routes.map((route, i) => (
								<Route
									key={'route_' + i}
									path={route.path}
									element={
										route.secure
											? withOidcSecure(
													route.component,
											  )({})
											: route.component()
									}
								/>
							))}
							<Route
								path="*"
								element={<Navigate to="/" />}
							/>
						</Routes>
					</ErrorBoundary>
				</Container>
				<ScrollTop />
				<Footer />
			</Box>
		</Box>
	);
};

const App = () => {
	const appStore = useSelector((store: RootState) => store.app);

	const { i18n } = useTranslation();

	useEffect(() => {
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider
				theme={
					appStore.theme === 'dark' ? DarkTheme : LightTheme
				}
			>
				<ThemeWrapper />
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default App;
