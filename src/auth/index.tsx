import Keycloak from 'keycloak-js';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/commons/loader/loader';
import { RootState } from '../configuration/store-configuration';
import useAuth from '../hooks/auth/useAuth';
import { initAuth } from '../redux/actions/app';

interface AuthenticationProviderProps {
	children: JSX.Element;
	config: any;
}

export const AuthenticationProvider = ({
	children,
	config,
}: AuthenticationProviderProps) => {
	var keycloak = useSelector((state: RootState) => state.user.auth);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	if (!keycloak) {
		keycloak = Keycloak({ ...config });
		keycloak
			.init({ onLoad: 'check-sso', enableLogging: true })
			.then((authenticated: any) => {
				dispatch(initAuth(keycloak));
			})
			.catch((err: any) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	}

	if (loading) {
		return <Loader />;
	} else {
		return children;
	}
};

export const withPrivateRoute = (WrappedComponent: any) => {
	const { authenticated, login } = useAuth();
	if (!authenticated) {
		login();
	}
	return WrappedComponent;
};
