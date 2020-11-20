import Store from './../../configuration/store-configuration';

export const loadUser = (user: any) => ({
	type: 'loadUser',
	payload: { user: user, config: Store.getState().app.config },
});
