import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/home';
import Create from './create/create';
import { Details } from './details/details';
import Search from './search/search';
import Settings from './settings/settings';
import PrivateRoute from './utils/private-route';

const Root = () => {
	return (
		<Switch>
			<PrivateRoute
				exact
				path="/realm/:id/create"
				component={Create}
			/>
			<PrivateRoute exact path="/detail/:id" component={Details} />
			<PrivateRoute exact path="/settings" component={Settings} />
			<PrivateRoute exact path="/realm/:realm" component={Search} />
			<Route exact path="/" component={Home} />
			<Redirect to="/" />
		</Switch>
	);
};

export default Root;
