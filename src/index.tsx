import React, { useEffect, useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import store from 'src/lib/configuration/store-configuration';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { saveConfig } from 'src/lib/redux/actions/app';
import { OidcProvider } from '@axa-fr/react-oidc';
import { loadUser } from 'src/lib/redux/actions/user';
import { getConfigFile } from 'src/lib/configuration/utils';
import { Loader } from './components/shared/loader/loader';
import App from 'src/components/app/app';
import 'src/lib/i18n';

const Start = () => {
	const [authConfiguration, setAuthConfiguration] = useState(undefined);
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
		<OidcProvider
			configuration={authConfiguration}
			loadingComponent={Loader}
			authenticatingComponent={Loader}
			sessionLostComponent={Loader}
			callbackSuccessComponent={Loader}
			onEvent={(
				_configurationName: string,
				name: string,
				user: any,
			) =>
				(name === 'token_aquired' ||
					name === 'token_renewed' ||
					name === 'refreshTokensAsync_silent_end') &&
				dispatch(loadUser(user))
			}
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
		</OidcProvider>
	);
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	// <React.StrictMode>
	<Suspense fallback={<Loader />}>
		<Provider store={store}>
			<Start />
		</Provider>
	</Suspense>,
	// </React.StrictMode>,
);
//Warning TODO Enable StrictMode break the app
