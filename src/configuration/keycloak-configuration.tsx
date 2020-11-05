import Keycloak, { KeycloakInitOptions } from 'keycloak-js';
import React from 'react';
import { KeycloakLoader } from './../components/loader/loader';

export const onKeycloakEvent = (event: any, error: any) => {};

export const onKeycloakTokens = (tokens: any) => {};

export const onKeycloackLoad = () => <KeycloakLoader />;

export const initOptions: KeycloakInitOptions = {
	onLoad: 'check-sso',
};

const kcConfig = `${window.location.origin}/keycloak.json`;
const keycloak = Keycloak(kcConfig);

export default keycloak;
