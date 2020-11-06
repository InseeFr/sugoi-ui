import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../configuration/utils';

export const ThemeButton = () => {
	const [check, setCheck] = useState(false);

	const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

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
						}
						if (!check) {
							setDarkMode(true);
							setCheck(true);
						}
					}}
					name="checkedB"
					color="primary"
				/>
			}
			label="Theme sombre"
		/>
	);
};
