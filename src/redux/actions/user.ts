import Store from './../../configuration/store-configuration';
import { KeycloakInstance } from 'keycloak-js';

export const initAuth = (keycloak: KeycloakInstance) => ({
	type: 'initAuth',
	payload: { keycloak },
});
