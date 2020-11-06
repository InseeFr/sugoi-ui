import { Button } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { useHistory } from 'react-router-dom';
import D from './../../i18n';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const LoginButton = () => {
	const {
		keycloak: { authenticated, logout, login },
	} = useKeycloak();
	const { push } = useHistory();

	const action: any = () => {
		if (authenticated) {
			push('/');
			logout();
		} else {
			login();
			push('/');
		}
	};

	return (
		<Button
			variant="contained"
			color="default"
			startIcon={<PowerSettingsNewIcon />}
			onClick={action}
		>
			{authenticated ? D.logout : D.login}
		</Button>
	);
};

export default LoginButton;
