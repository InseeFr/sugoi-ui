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
import { MuiThemeProvider } from '@material-ui/core';
import Theme from './material-ui-theme';

ReactDOM.render(
	<MuiThemeProvider theme={Theme}>
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
					<App />
				</BrowserRouter>
			</Provider>
		</ReactKeycloakProvider>
	</MuiThemeProvider>,
	document.getElementById('root'),
);
