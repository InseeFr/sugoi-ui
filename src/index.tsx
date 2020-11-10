import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './configuration/store-configuration';
import App from './components/app';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak, {
	initOptions,
	onKeycloakEvent,
	onKeycloakTokens,
	onKeycloackLoad,
} from './configuration/keycloak-configuration';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
	<ReactKeycloakProvider
		authClient={keycloak}
		initOptions={initOptions}
		autoRefreshToken={true}
		onEvent={onKeycloakEvent}
		onTokens={onKeycloakTokens}
		LoadingComponent={onKeycloackLoad()}
	>
		<Provider store={Store}>
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
		</Provider>
	</ReactKeycloakProvider>,
	document.getElementById('root'),
);
