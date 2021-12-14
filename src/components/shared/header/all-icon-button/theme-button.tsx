import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/lib/configuration/store-configuration';
import { changeTheme } from 'src/lib/redux/actions/app';

export const ThemeButton = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state: RootState) => state.app.theme);
	const [check, setCheck] = useState(theme === 'light');
	const { t } = useTranslation();

	const handleClick = () => {
		dispatch(!check ? changeTheme('light') : changeTheme('dark'));
		setCheck(!check);
	};

	return (
		<IconButton
			color="inherit"
			size="medium"
			aria-label="Change theme"
			onClick={handleClick}
			title={t('commons.header.buttons.theme')}
		>
			{check ? <BrightnessHighIcon /> : <Brightness4Icon />}
		</IconButton>
	);
};
