import { useReactOidc } from '@axa-fr/react-oidc-context';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
	const { login, logout, oidcUser } = useReactOidc();
	const { push } = useHistory();
	const { t } = useTranslation();
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
				aria-label={
					oidcUser
						? t('commons.header.buttons.logout')
						: t('commons.header.buttons.login')
				}
				onClick={action}
				title={
					oidcUser
						? t('commons.header.buttons.logout')
						: t('commons.header.buttons.login')
				}
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
