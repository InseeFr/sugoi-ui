import React, { useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import store from './configuration/store-configuration';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import {
	AuthenticationProvider,
	InMemoryWebStorage,
	oidcLog,
} from '@axa-fr/react-oidc-context';
import { UserManagerSettings } from 'oidc-client';
import { Loader } from './components/commons/loader/loader';
import App from './components/app';
import './i18n';
import { useGetConfig } from './hooks/technics/useConfigFile';
import { Provider } from 'react-redux';

const Start = () => {
	const { loading, authConfig } = useGetConfig();
	console.log('reload index');
	return loading ? (
		<Loader />
	) : (
		<AuthenticationProvider
			configuration={authConfig as UserManagerSettings | undefined}
			loggerLevel={oidcLog.DEBUG}
			isEnabled={true}
			callbackComponentOverride={Loader}
			UserStore={InMemoryWebStorage}
			authenticating={Loader}
			sessionLostComponent={Loader}
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
