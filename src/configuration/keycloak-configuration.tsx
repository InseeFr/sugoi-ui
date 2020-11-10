import Keycloak, { KeycloakInitOptions } from 'keycloak-js';
import React from 'react';
import { KeycloakLoader } from './../components/loader/loader';
import Store from './store-configuration';
import jwt_decode from 'jwt-decode';
import { tokenChanged } from '../redux/actions/app';

export const onKeycloakEvent = (event: any, error: any) => {};

export const onKeycloakTokens = (tokens: any) => {
	const payload = {
		config: Store.getState().app.config,
		token: jwt_decode(tokens.token),
	};
	Store.dispatch(tokenChanged(payload));
};

export const onKeycloackLoad = () => <KeycloakLoader />;

export const initOptions: KeycloakInitOptions = {
	onLoad: 'check-sso',
};

const kcConfig = `${window.location.origin}/keycloak.json`;
const keycloak = Keycloak(kcConfig);

export default keycloak;
