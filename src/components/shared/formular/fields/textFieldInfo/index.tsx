import { Box, TextField } from '@mui/material';
import React, { memo } from 'react';
import PopIcon from 'src/components/shared/popIcon/popIcon';

interface props {
	name: string;
	required?: boolean;
	helpTextTitle?: string;
	helpText?: string;
	modifiable?: boolean;
	value: string;
	handleChange?: any;
	error?: boolean;
	errorText?: string;
}

const TextFieldInfo = ({
	name,
	required,
	modifiable,
	helpTextTitle,
	helpText,
	value,
	handleChange,
	error,
	errorText,
}: props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<TextField
				required={required}
				variant="outlined"
				label={name}
				name={name}
				disabled={!modifiable}
				value={value || ''}
				fullWidth
				onChange={(e) => handleChange(e.target.value)}
				error={error}
				helperText={errorText}
			/>
			<PopIcon helpTextTitle={helpTextTitle} helpText={helpText} />
		</Box>
	);
};

function textFieldPropsAreEqual(prevTextField: props, nextTextField: props) {
	return (
		prevTextField.value === nextTextField.value &&
		prevTextField.error === nextTextField.error
	);
}

TextFieldInfo.defaultProps = {
	error: false,
};

export default memo(TextFieldInfo, textFieldPropsAreEqual);
