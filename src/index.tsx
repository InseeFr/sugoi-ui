import React, { useEffect, useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './configuration/store-configuration';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { saveConfig } from './redux/actions/app';
import { loadUser } from './redux/actions/user';
import {
	AuthenticationProvider,
	InMemoryWebStorage,
	oidcLog,
} from '@axa-fr/react-oidc-context';
import { UserManagerSettings } from 'oidc-client';
import { getConfigFile } from './configuration/utils';
import { Loader } from './components/commons/loader/loader';
import App from './components/app';
import './i18n';

const Start = () => {
	const [authConfiguration, setAuthConfiguration] = useState<
		UserManagerSettings | undefined
	>(undefined);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		getConfigFile().then((config) => {
			setAuthConfiguration(config.auth);
			dispatch(saveConfig(config));
			setLoading(false);
		});
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : (
		<AuthenticationProvider
			configuration={authConfiguration}
			loggerLevel={oidcLog.INFO}
			isEnabled={true}
			callbackComponentOverride={Loader}
			UserStore={InMemoryWebStorage}
			authenticating={Loader}
			sessionLostComponent={Loader}
			customEvents={{
				onUserLoaded: (user) => dispatch(loadUser(user)),
				onUserUnloaded: () => console.log('onUserUnloaded'),
				onSilentRenewError: (error) =>
					console.log('onSilentRenewError', error),
				onUserSignedOut: () => console.log('onUserSignedOut'),
				onUserSessionChanged: () =>
					console.log('onUserSessionChanged'),
				onAccessTokenExpiring: () =>
					console.log('onAccessTokenExpiring'),
				onAccessTokenExpired: () =>
					console.log('onAccessTokenExpired'),
			}}
		>
			<BrowserRouter>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					hideIconVariant={false}
				>
					<App />
				</SnackbarProvider>
			</BrowserRouter>
		</AuthenticationProvider>
	);
};
ReactDOM.render(
	<Suspense fallback={<Loader />}>
		<Provider store={store}>
			<Start />
		</Provider>
	</Suspense>,
	document.getElementById('root'),
);
