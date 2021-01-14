import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../../../hooks/technics/useLocalStorage';
import { changeTheme } from '../../../../redux/actions/app';
export const ThemeButton = () => {
	const dispatch = useDispatch();
	const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
	const [check, setCheck] = useState(darkMode);

	return (
		<IconButton
			color="inherit"
			size="medium"
			aria-label="Change theme"
			onClick={() => {
				setCheck(!check);
				if (check) {
					setCheck(false);
					setDarkMode(false);
					dispatch(changeTheme('light'));
				}
				if (!check) {
					setDarkMode(true);
					setCheck(true);
					dispatch(changeTheme('dark'));
				}
			}}
			title="Change theme"
		>
			{check ? <Brightness4Icon /> : <BrightnessHighIcon />}
		</IconButton>
	);
};
