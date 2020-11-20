import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../../configuration/utils';
import { changeTheme } from '../../../redux/actions/app';
export const ThemeButton = () => {
	const dispatch = useDispatch();
	const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
	const [check, setCheck] = useState(darkMode);

	return (
		<FormControlLabel
			control={
				<Switch
					checked={check}
					onChange={() => {
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
					name="checkedB"
					color="primary"
				/>
			}
			label="Thème sombre"
		/>
	);
};
