import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
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
