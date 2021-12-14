import { useEffect, useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from 'src/lib/configuration/store-configuration';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { saveConfig } from 'src/lib/redux/actions/app';
import { loadUser } from 'src/lib/redux/actions/user';
import {
	AuthenticationProvider,
	InMemoryWebStorage,
	oidcLog,
} from '@axa-fr/react-oidc-context';
import { UserManagerSettings } from 'oidc-client';
import { getConfigFile } from 'src/lib/configuration/utils';
import { Loader } from './components/shared/loader/loader';
import App from 'src/components/app/app';
import 'src/lib/i18n';

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
				onUserUnloaded: () => {},
				onSilentRenewError: (error) => {},
				onUserSignedOut: () => {},
				onUserSessionChanged: () => {},
				onAccessTokenExpiring: () => {},
				onAccessTokenExpired: () => {},
			}}
		>
			<BrowserRouter>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'bottom',
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
