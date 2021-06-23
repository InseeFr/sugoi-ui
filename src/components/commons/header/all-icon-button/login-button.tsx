import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../../hooks/auth/useAuth';

const LoginButton = () => {
	const { login, logout, authenticated } = useAuth();
	const { push } = useHistory();
	const { t } = useTranslation();
	const action: any = () => {
		if (authenticated) {
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
				aria-label={
					authenticated
						? t('commons.header.buttons.logout')
						: t('commons.header.buttons.login')
				}
				onClick={action}
				title={
					authenticated
						? t('commons.header.buttons.logout')
						: t('commons.header.buttons.login')
				}
			>
				{authenticated ? (
					<ExitToAppIcon />
				) : (
					<PowerSettingsNewIcon />
				)}
			</IconButton>
		</>
	);
};

export default LoginButton;
