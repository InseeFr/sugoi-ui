import React from 'react';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import D from '../../../i18n';

interface props {
	value: string;
	setValue: any;
}

const Selector = (props: props) => {
	const { value, setValue } = props;
	return (
		<FormControl component="fieldset" style={{ display: 'flex' }}>
			<FormLabel component="legend">
				{D.formular_radio_button_choose}
			</FormLabel>
			<RadioGroup
				row
				aria-label={D.formular_radio_button_choose}
				name="type"
				value={value}
				onChange={setValue}
			>
				<FormControlLabel
					value="user"
					control={<Radio />}
					label={D.formular_radio_button_user}
				/>
				<FormControlLabel
					value="organization"
					control={<Radio />}
					label={D.formular_radio_button_organization}
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default Selector;
