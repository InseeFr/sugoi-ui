import React, { useEffect, useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './configuration/store-configuration';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { UserManagerSettings } from 'oidc-client';
import { Loader } from './components/commons/loader/loader';
import App from './components/app';
import './i18n';
import { AuthenticationProvider } from './auth';
import { useConfigFile } from './hooks/technics/useConfigFile';

const Start = () => {
	const { config, loading } = useConfigFile();
	return loading ? (
		<Loader />
	) : (
		<AuthenticationProvider config={config.auth}>
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
