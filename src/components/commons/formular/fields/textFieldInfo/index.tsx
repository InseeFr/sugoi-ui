import React, { memo } from 'react';
import { createStyles, makeStyles, Theme, TextField } from '@material-ui/core';
import PopIcon from '../../../popIcon/popIcon';

interface props {
	name: string;
	helpTextTitle?: string;
	helpText?: string;
	modifiable?: boolean;
	value: string;
	handleChange?: any;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
		},
	}),
);
const TextFieldInfo = ({
	name,
	modifiable,
	helpTextTitle,
	helpText,
	value,
	handleChange,
}: props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<TextField
				variant="outlined"
				label={name}
				name={name}
				disabled={!modifiable}
				value={value || ''}
				fullWidth
				onChange={(e) => handleChange(e.target.value)}
			/>
			<PopIcon helpTextTitle={helpTextTitle} helpText={helpText} />
		</div>
	);
};

function textFieldPropsAreEqual(prevTextField: props, nextTextField: props) {
	return prevTextField.value === nextTextField.value;
}

export default memo(TextFieldInfo, textFieldPropsAreEqual);
