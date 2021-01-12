import { withOidcSecure } from '@axa-fr/react-oidc-context';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Create from '../create/create';
import DetailsUser from '../details/detailsUser';
import DetailsOrganization from '../details/detailsOrganization';
import Home from '../home/home';
import Search from '../search';
import Settings from '../settings/settings';
const Routes = () => {
	return (
		<Switch>
			<Route
				exact
				path="/realm/:realm/create"
				component={withOidcSecure(Create)}
			/>
			<Route
				exact
				path="/realm/:realm/user/:id"
				component={withOidcSecure(DetailsUser)}
			/>
			<Route
				exact
				path="/realm/:realm/organization/:id"
				component={withOidcSecure(DetailsOrganization)}
			/>
			<Route
				exact
				path="/settings"
				component={withOidcSecure(Settings)}
			/>
			<Route
				exact
				path="/realm/:realm"
				component={withOidcSecure(Search)}
			/>
			<Route exact path="/" component={Home} />
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
