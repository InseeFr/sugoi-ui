import { useReactOidc } from '@axa-fr/react-oidc-context';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
	const { login, logout, oidcUser } = useReactOidc();
	const { push } = useHistory();

	const action: any = () => {
		if (oidcUser) {
			push('/');
			logout();
		} else {
			login();
		}
	};

	return (
		<>
			<IconButton
				color="inherit"
				size="medium"
				aria-label="show account information"
				onClick={action}
			>
				{oidcUser ? (
					<ExitToAppIcon />
				) : (
					<PowerSettingsNewIcon />
				)}
			</IconButton>
		</>
	);
};

export default LoginButton;
