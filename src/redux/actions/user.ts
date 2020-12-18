import Store from './../../configuration/store-configuration';

import { User } from 'oidc-client';

export const loadUser = (user: User) => ({
	type: 'loadUser',
	payload: { user: user, config: Store.getState().app.config },
});
