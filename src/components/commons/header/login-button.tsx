import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useHistory } from 'react-router-dom';
import D from './../../../i18n';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const useStyles = makeStyles((theme) => ({
	buttonShort: {
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
		},
	},
	buttonExpanded: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
}));

const LoginButton = () => {
	const { login, logout, oidcUser } = useReactOidc();
	const { push } = useHistory();
	const classes = useStyles();

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
			<Fab
				id="bouton-login"
				data-testid="bouton-login"
				variant="extended"
				aria-label="login"
				onClick={action}
				className={classes.buttonExpanded}
				color="default"
			>
				{!oidcUser ? (
					<PowerSettingsNewIcon />
				) : (
					<ExitToAppIcon />
				)}
				{oidcUser ? D.logout : D.login}
			</Fab>
			<Fab
				id="bouton-login"
				data-testid="bouton-login"
				onClick={action}
				className={classes.buttonShort}
				color="default"
				size="small"
			>
				{!oidcUser ? (
					<PowerSettingsNewIcon />
				) : (
					<ExitToAppIcon />
				)}
			</Fab>
		</>
	);
};

export default LoginButton;
