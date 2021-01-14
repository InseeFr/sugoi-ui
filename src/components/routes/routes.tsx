import { withOidcSecure } from '@axa-fr/react-oidc-context';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreateOrganization from '../createOrganization';
import CreateUsers from '../createUser';
import DetailsOrganization from '../details/detailsOrganization';
import DetailsUser from '../details/detailsUser';
import Home from '../home/home';
import SearchOrganizations from '../searchOrganization';
import SearchUsers from '../searchUser';
import Settings from '../settings/settings';
const Routes = () => {
	return (
		<Switch>
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
				path="/realm/:realm/search/users"
				component={withOidcSecure(SearchUsers)}
			/>
			<Route
				exact
				path="/realm/:realm/search/organizations"
				component={withOidcSecure(SearchOrganizations)}
			/>
			<Route
				exact
				path="/realm/:realm/create/user"
				component={withOidcSecure(CreateUsers)}
			/>
			<Route
				exact
				path="/realm/:realm/create/organization"
				component={withOidcSecure(CreateOrganization)}
			/>
			<Route exact path="/" component={Home} />
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
