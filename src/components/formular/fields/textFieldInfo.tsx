import React from 'react';
import { createStyles, makeStyles, Theme, TextField } from '@material-ui/core';
import PopIcon from '../../commons/popIcon/popIcon';

interface props {
	name: string;
	helpTextTitle?: string;
	helpText?: string;
	modifiable?: boolean;
	value: string;
	handleChange: any;
	path: string;
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
	path,
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
				onChange={(e) => handleChange(path, e.target.value)}
			/>
			<PopIcon helpTextTitle={helpTextTitle} helpText={helpText} />
		</div>
	);
};

export default TextFieldInfo;
